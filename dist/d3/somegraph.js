var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "d3v4"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const d3 = __importStar(require("d3v4"));
    // Dimensions of sunburst.
    const width = 750;
    const height = 600;
    const radius = Math.min(width, height) / 2;
    // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    const b = {
        w: 75, h: 30, s: 3, t: 10,
    };
    // Mapping of step names to colors.
    const colors = {
        home: "#5687d1",
        product: "#7b615c",
        search: "#de783b",
        account: "#6ab975",
        other: "#a173d1",
        end: "#bbbbbb",
    };
    // Total size of all segments; we set this later, after loading the data.
    let totalSize = 0;
    const vis = d3.select("#chart").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("id", "container")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    const partition = d3.layout.partition()
        .size([2 * Math.PI, radius * radius])
        .value(function (d) {
        return d.size;
    });
    const arc = d3.svg.arc()
        .startAngle(function (d) {
        return d.x;
    })
        .endAngle(function (d) {
        return d.x + d.dx;
    })
        .innerRadius(function (d) {
        return Math.sqrt(d.y);
    })
        .outerRadius(function (d) {
        return Math.sqrt(d.y + d.dy);
    });
    // Use d3.text and d3.csv.parseRows so that we do not need to have a header
    // row, and can receive the csv as an array of arrays.
    d3.text("visit-sequences.csv", function (text) {
        const csv = d3.csv.parseRows(text);
        const json = buildHierarchy(csv);
        createVisualization(json);
    });
    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json) {
        // Basic setup of page elements.
        initializeBreadcrumbTrail();
        drawLegend();
        d3.select("#togglelegend").on("click", toggleLegend);
        // Bounding circle underneath the sunburst, to make it easier to detect
        // when the mouse leaves the parent g.
        vis.append("svg:circle")
            .attr("r", radius)
            .style("opacity", 0);
        // For efficiency, filter nodes to keep only those large enough to see.
        const nodes = partition.nodes(json)
            .filter(function (d) {
            return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
        });
        const path = vis.data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("display", function (d) {
            return d.depth ? null : "none";
        })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function (d) {
            return colors[d.name];
        })
            .style("opacity", 1)
            .on("mouseover", mouseover);
        // Add the mouseleave handler to the bounding circle.
        d3.select("#container").on("mouseleave", mouseleave);
        // Get total size of the tree = value of root node from partition.
        totalSize = path.node().__data__.value;
    }
    // Fade all but the current sequence, and show it in the breadcrumb trail.
    function mouseover(d) {
        const percentage = (100 * d.value / totalSize).toPrecision(3);
        let percentageString = percentage + "%";
        if (percentage < 0.1) {
            percentageString = "< 0.1%";
        }
        d3.select("#percentage")
            .text(percentageString);
        d3.select("#explanation")
            .style("visibility", "");
        const sequenceArray = getAncestors(d);
        updateBreadcrumbs(sequenceArray, percentageString);
        // Fade all the segments.
        d3.selectAll("path")
            .style("opacity", 0.3);
        // Then highlight only those that are an ancestor of the current segment.
        vis.selectAll("path")
            .filter(function (node) {
            return (sequenceArray.indexOf(node) >= 0);
        })
            .style("opacity", 1);
    }
    // Restore everything to full opacity when moving off the visualization.
    function mouseleave(d) {
        // Hide the breadcrumb trail
        d3.select("#trail")
            .style("visibility", "hidden");
        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);
        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .each("end", function () {
            d3.select(this).on("mouseover", mouseover);
        });
        d3.select("#explanation")
            .style("visibility", "hidden");
    }
    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    function getAncestors(node) {
        const path = [];
        let current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }
    function initializeBreadcrumbTrail() {
        // Add the svg area.
        const trail = d3.select("#sequence").append("svg:svg")
            .attr("width", width)
            .attr("height", 50)
            .attr("id", "trail");
        // Add the label at the end, for the percentage.
        trail.append("svg:text")
            .attr("id", "endlabel")
            .style("fill", "#000");
    }
    // Generate a string that describes the points of a breadcrumb polygon.
    function breadcrumbPoints(d, i) {
        const points = [];
        points.push("0,0");
        points.push(b.w + ",0");
        points.push(b.w + b.t + "," + (b.h / 2));
        points.push(b.w + "," + b.h);
        points.push("0," + b.h);
        if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
            points.push(b.t + "," + (b.h / 2));
        }
        return points.join(" ");
    }
    // Update the breadcrumb trail to show the current sequence and percentage.
    function updateBreadcrumbs(nodeArray, percentageString) {
        // Data join; key function combines name and depth (= position in sequence).
        const g = d3.select("#trail")
            .selectAll("g")
            .data(nodeArray, function (d) {
            return d.name + d.depth;
        });
        // Add breadcrumb and label for entering nodes.
        const entering = g.enter().append("svg:g");
        entering.append("svg:polygon")
            .attr("points", breadcrumbPoints)
            .style("fill", function (d) {
            return colors[d.name];
        });
        entering.append("svg:text")
            .attr("x", (b.w + b.t) / 2)
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(function (d) {
            return d.name;
        });
        // Set position for entering and updating nodes.
        g.attr("transform", function (d, i) {
            return "translate(" + i * (b.w + b.s) + ", 0)";
        });
        // Remove exiting nodes.
        g.exit().remove();
        // Now move and update the percentage at the end.
        d3.select("#trail").select("#endlabel")
            .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(percentageString);
        // Make the breadcrumb trail visible, if it's hidden.
        d3.select("#trail")
            .style("visibility", "");
    }
    function drawLegend() {
        // Dimensions of legend item: width, height, spacing, radius of rounded rect.
        const li = {
            w: 75, h: 30, s: 3, r: 3,
        };
        const legend = d3.select("#legend").append("svg:svg")
            .attr("width", li.w)
            .attr("height", d3.keys(colors).length * (li.h + li.s));
        const g = legend.selectAll("g")
            .data(d3.entries(colors))
            .enter().append("svg:g")
            .attr("transform", function (d, i) {
            return "translate(0," + i * (li.h + li.s) + ")";
        });
        g.append("svg:rect")
            .attr("rx", li.r)
            .attr("ry", li.r)
            .attr("width", li.w)
            .attr("height", li.h)
            .style("fill", function (d) {
            return d.value;
        });
        g.append("svg:text")
            .attr("x", li.w / 2)
            .attr("y", li.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(function (d) {
            return d.key;
        });
    }
    function toggleLegend() {
        const legend = d3.select("#legend");
        if (legend.style("visibility") == "hidden") {
            legend.style("visibility", "");
        }
        else {
            legend.style("visibility", "hidden");
        }
    }
    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how
    // often that sequence occurred.
    function buildHierarchy(csv) {
        const root = { name: "root", children: [] };
        for (let i = 0; i < csv.length; i++) {
            const sequence = csv[i][0];
            const size = +csv[i][1];
            if (isNaN(size)) { // e.g. if this is a header row
                continue;
            }
            const parts = sequence.split("-");
            let currentNode = root;
            for (let j = 0; j < parts.length; j++) {
                const children = currentNode.children;
                const nodeName = parts[j];
                let childNode;
                if (j + 1 < parts.length) {
                    // Not yet at the end of the sequence; move down the tree.
                    let foundChild = false;
                    for (let k = 0; k < children.length; k++) {
                        if (children[k].name == nodeName) {
                            childNode = children[k];
                            foundChild = true;
                            break;
                        }
                    }
                    // If we don't already have a child node for this branch, create it.
                    if (!foundChild) {
                        childNode = { name: nodeName, children: [] };
                        children.push(childNode);
                    }
                    currentNode = childNode;
                }
                else {
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { name: nodeName, size };
                    children.push(childNode);
                }
            }
        }
        return root;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29tZWdyYXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2QzL3NvbWVncmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5Q0FBMkI7SUFFM0IsMEJBQTBCO0lBQzFCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNsQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTNDLG9FQUFvRTtJQUNwRSxNQUFNLENBQUMsR0FBRztRQUNSLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0tBQzFCLENBQUM7SUFFRixtQ0FBbUM7SUFDbkMsTUFBTSxNQUFNLEdBQUc7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEdBQUcsRUFBRSxTQUFTO0tBQ2YsQ0FBQztJQUVGLHlFQUF5RTtJQUN6RSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFFbEIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO1NBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1NBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDZixJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQztTQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcs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b0JBQ3ZELFNBQVMsR0FBRyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7b0JBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzFCO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGQzIGZyb20gXCJkM3Y0XCI7XG5cbi8vIERpbWVuc2lvbnMgb2Ygc3VuYnVyc3QuXG5jb25zdCB3aWR0aCA9IDc1MDtcbmNvbnN0IGhlaWdodCA9IDYwMDtcbmNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMjtcblxuLy8gQnJlYWRjcnVtYiBkaW1lbnNpb25zOiB3aWR0aCwgaGVpZ2h0LCBzcGFjaW5nLCB3aWR0aCBvZiB0aXAvdGFpbC5cbmNvbnN0IGIgPSB7XG4gIHc6IDc1LCBoOiAzMCwgczogMywgdDogMTAsXG59O1xuXG4vLyBNYXBwaW5nIG9mIHN0ZXAgbmFtZXMgdG8gY29sb3JzLlxuY29uc3QgY29sb3JzID0ge1xuICBob21lOiBcIiM1Njg3ZDFcIixcbiAgcHJvZHVjdDogXCIjN2I2MTVjXCIsXG4gIHNlYXJjaDogXCIjZGU3ODNiXCIsXG4gIGFjY291bnQ6IFwiIzZhYjk3NVwiLFxuICBvdGhlcjogXCIjYTE3M2QxXCIsXG4gIGVuZDogXCIjYmJiYmJiXCIsXG59O1xuXG4vLyBUb3RhbCBzaXplIG9mIGFsbCBzZWdtZW50czsgd2Ugc2V0IHRoaXMgbGF0ZXIsIGFmdGVyIGxvYWRpbmcgdGhlIGRhdGEuXG5sZXQgdG90YWxTaXplID0gMDtcblxuY29uc3QgdmlzID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpLmFwcGVuZChcInN2ZzpzdmdcIilcbiAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAuYXBwZW5kKFwic3ZnOmdcIilcbiAgLmF0dHIoXCJpZFwiLCBcImNvbnRhaW5lclwiKVxuICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKTtcblxuY29uc3QgcGFydGl0aW9uID0gZDMubGF5b3V0LnBhcnRpdGlvbigpXG4gIC5zaXplKFsyICogTWF0aC5QSSwgcmFkaXVzICogcmFkaXVzXSlcbiAgLnZhbHVlKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5zaXplO1xuICB9KTtcblxuY29uc3QgYXJjID0gZDMuc3ZnLmFyYygpXG4gIC5zdGFydEFuZ2xlKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC54O1xuICB9KVxuICAuZW5kQW5nbGUoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLnggKyBkLmR4O1xuICB9KVxuICAuaW5uZXJSYWRpdXMoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoZC55KTtcbiAgfSlcbiAgLm91dGVyUmFkaXVzKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGQueSArIGQuZHkpO1xuICB9KTtcblxuLy8gVXNlIGQzLnRleHQgYW5kIGQzLmNzdi5wYXJzZVJvd3Mgc28gdGhhdCB3ZSBkbyBub3QgbmVlZCB0byBoYXZlIGEgaGVhZGVyXG4vLyByb3csIGFuZCBjYW4gcmVjZWl2ZSB0aGUgY3N2IGFzIGFuIGFycmF5IG9mIGFycmF5cy5cbmQzLnRleHQoXCJ2aXNpdC1zZXF1ZW5jZXMuY3N2XCIsIGZ1bmN0aW9uKHRleHQpIHtcbiAgY29uc3QgY3N2ID0gZDMuY3N2LnBhcnNlUm93cyh0ZXh0KTtcbiAgY29uc3QganNvbiA9IGJ1aWxkSGllcmFyY2h5KGNzdik7XG4gIGNyZWF0ZVZpc3VhbGl6YXRpb24oanNvbik7XG59KTtcblxuLy8gTWFpbiBmdW5jdGlvbiB0byBkcmF3IGFuZCBzZXQgdXAgdGhlIHZpc3VhbGl6YXRpb24sIG9uY2Ugd2UgaGF2ZSB0aGUgZGF0YS5cbmZ1bmN0aW9uIGNyZWF0ZVZpc3VhbGl6YXRpb24oanNvbikge1xuXG4gIC8vIEJhc2ljIHNldHVwIG9mIHBhZ2UgZWxlbWVudHMuXG4gIGluaXRpYWxpemVCcmVhZGNydW1iVHJhaWwoKTtcbiAgZHJhd0xlZ2VuZCgpO1xuICBkMy5zZWxlY3QoXCIjdG9nZ2xlbGVnZW5kXCIpLm9uKFwiY2xpY2tcIiwgdG9nZ2xlTGVnZW5kKTtcblxuICAvLyBCb3VuZGluZyBjaXJjbGUgdW5kZXJuZWF0aCB0aGUgc3VuYnVyc3QsIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGRldGVjdFxuICAvLyB3aGVuIHRoZSBtb3VzZSBsZWF2ZXMgdGhlIHBhcmVudCBnLlxuICB2aXMuYXBwZW5kKFwic3ZnOmNpcmNsZVwiKVxuICAgIC5hdHRyKFwiclwiLCByYWRpdXMpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICAvLyBGb3IgZWZmaWNpZW5jeSwgZmlsdGVyIG5vZGVzIHRvIGtlZXAgb25seSB0aG9zZSBsYXJnZSBlbm91Z2ggdG8gc2VlLlxuICBjb25zdCBub2RlcyA9IHBhcnRpdGlvbi5ub2Rlcyhqc29uKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIChkLmR4ID4gMC4wMDUpOyAvLyAwLjAwNSByYWRpYW5zID0gMC4yOSBkZWdyZWVzXG4gICAgfSk7XG5cbiAgY29uc3QgcGF0aCA9IHZpcy5kYXRhKFtqc29uXSkuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKG5vZGVzKVxuICAgIC5lbnRlcigpLmFwcGVuZChcInN2ZzpwYXRoXCIpXG4gICAgLmF0dHIoXCJkaXNwbGF5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkLmRlcHRoID8gbnVsbCA6IFwibm9uZVwiO1xuICAgIH0pXG4gICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAuYXR0cihcImZpbGwtcnVsZVwiLCBcImV2ZW5vZGRcIilcbiAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5uYW1lXTtcbiAgICB9KVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSlcbiAgICAub24oXCJtb3VzZW92ZXJcIiwgbW91c2VvdmVyKTtcblxuICAvLyBBZGQgdGhlIG1vdXNlbGVhdmUgaGFuZGxlciB0byB0aGUgYm91bmRpbmcgY2lyY2xlLlxuICBkMy5zZWxlY3QoXCIjY29udGFpbmVyXCIpLm9uKFwibW91c2VsZWF2ZVwiLCBtb3VzZWxlYXZlKTtcblxuICAvLyBHZXQgdG90YWwgc2l6ZSBvZiB0aGUgdHJlZSA9IHZhbHVlIG9mIHJvb3Qgbm9kZSBmcm9tIHBhcnRpdGlvbi5cbiAgdG90YWxTaXplID0gcGF0aC5ub2RlKCkuX19kYXRhX18udmFsdWU7XG59XG5cbi8vIEZhZGUgYWxsIGJ1dCB0aGUgY3VycmVudCBzZXF1ZW5jZSwgYW5kIHNob3cgaXQgaW4gdGhlIGJyZWFkY3J1bWIgdHJhaWwuXG5mdW5jdGlvbiBtb3VzZW92ZXIoZCkge1xuXG4gIGNvbnN0IHBlcmNlbnRhZ2UgPSAoMTAwICogZC52YWx1ZSAvIHRvdGFsU2l6ZSkudG9QcmVjaXNpb24oMyk7XG4gIGxldCBwZXJjZW50YWdlU3RyaW5nID0gcGVyY2VudGFnZSArIFwiJVwiO1xuICBpZiAocGVyY2VudGFnZSA8IDAuMSkge1xuICAgIHBlcmNlbnRhZ2VTdHJpbmcgPSBcIjwgMC4xJVwiO1xuICB9XG5cbiAgZDMuc2VsZWN0KFwiI3BlcmNlbnRhZ2VcIilcbiAgICAudGV4dChwZXJjZW50YWdlU3RyaW5nKTtcblxuICBkMy5zZWxlY3QoXCIjZXhwbGFuYXRpb25cIilcbiAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiXCIpO1xuXG4gIGNvbnN0IHNlcXVlbmNlQXJyYXkgPSBnZXRBbmNlc3RvcnMoZCk7XG4gIHVwZGF0ZUJyZWFkY3J1bWJzKHNlcXVlbmNlQXJyYXksIHBlcmNlbnRhZ2VTdHJpbmcpO1xuXG4gIC8vIEZhZGUgYWxsIHRoZSBzZWdtZW50cy5cbiAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMC4zKTtcblxuICAvLyBUaGVuIGhpZ2hsaWdodCBvbmx5IHRob3NlIHRoYXQgYXJlIGFuIGFuY2VzdG9yIG9mIHRoZSBjdXJyZW50IHNlZ21lbnQuXG4gIHZpcy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgLmZpbHRlcihmdW5jdGlvbihub2RlKSB7XG4gICAgICByZXR1cm4gKHNlcXVlbmNlQXJyYXkuaW5kZXhPZihub2RlKSA+PSAwKTtcbiAgICB9KVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG59XG5cbi8vIFJlc3RvcmUgZXZlcnl0aGluZyB0byBmdWxsIG9wYWNpdHkgd2hlbiBtb3Zpbmcgb2ZmIHRoZSB2aXN1YWxpemF0aW9uLlxuZnVuY3Rpb24gbW91c2VsZWF2ZShkKSB7XG5cbiAgLy8gSGlkZSB0aGUgYnJlYWRjcnVtYiB0cmFpbFxuICBkMy5zZWxlY3QoXCIjdHJhaWxcIilcbiAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuXG4gIC8vIERlYWN0aXZhdGUgYWxsIHNlZ21lbnRzIGR1cmluZyB0cmFuc2l0aW9uLlxuICBkMy5zZWxlY3RBbGwoXCJwYXRoXCIpLm9uKFwibW91c2VvdmVyXCIsIG51bGwpO1xuXG4gIC8vIFRyYW5zaXRpb24gZWFjaCBzZWdtZW50IHRvIGZ1bGwgb3BhY2l0eSBhbmQgdGhlbiByZWFjdGl2YXRlIGl0LlxuICBkMy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbigxMDAwKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSlcbiAgICAuZWFjaChcImVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGQzLnNlbGVjdCh0aGlzKS5vbihcIm1vdXNlb3ZlclwiLCBtb3VzZW92ZXIpO1xuICAgIH0pO1xuXG4gIGQzLnNlbGVjdChcIiNleHBsYW5hdGlvblwiKVxuICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG59XG5cbi8vIEdpdmVuIGEgbm9kZSBpbiBhIHBhcnRpdGlvbiBsYXlvdXQsIHJldHVybiBhbiBhcnJheSBvZiBhbGwgb2YgaXRzIGFuY2VzdG9yXG4vLyBub2RlcywgaGlnaGVzdCBmaXJzdCwgYnV0IGV4Y2x1ZGluZyB0aGUgcm9vdC5cbmZ1bmN0aW9uIGdldEFuY2VzdG9ycyhub2RlKSB7XG4gIGNvbnN0IHBhdGggPSBbXTtcbiAgbGV0IGN1cnJlbnQgPSBub2RlO1xuICB3aGlsZSAoY3VycmVudC5wYXJlbnQpIHtcbiAgICBwYXRoLnVuc2hpZnQoY3VycmVudCk7XG4gICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplQnJlYWRjcnVtYlRyYWlsKCkge1xuICAvLyBBZGQgdGhlIHN2ZyBhcmVhLlxuICBjb25zdCB0cmFpbCA9IGQzLnNlbGVjdChcIiNzZXF1ZW5jZVwiKS5hcHBlbmQoXCJzdmc6c3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCA1MClcbiAgICAuYXR0cihcImlkXCIsIFwidHJhaWxcIik7XG4gIC8vIEFkZCB0aGUgbGFiZWwgYXQgdGhlIGVuZCwgZm9yIHRoZSBwZXJjZW50YWdlLlxuICB0cmFpbC5hcHBlbmQoXCJzdmc6dGV4dFwiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJlbmRsYWJlbFwiKVxuICAgIC5zdHlsZShcImZpbGxcIiwgXCIjMDAwXCIpO1xufVxuXG4vLyBHZW5lcmF0ZSBhIHN0cmluZyB0aGF0IGRlc2NyaWJlcyB0aGUgcG9pbnRzIG9mIGEgYnJlYWRjcnVtYiBwb2x5Z29uLlxuZnVuY3Rpb24gYnJlYWRjcnVtYlBvaW50cyhkLCBpKSB7XG4gIGNvbnN0IHBvaW50cyA9IFtdO1xuICBwb2ludHMucHVzaChcIjAsMFwiKTtcbiAgcG9pbnRzLnB1c2goYi53ICsgXCIsMFwiKTtcbiAgcG9pbnRzLnB1c2goYi53ICsgYi50ICsgXCIsXCIgKyAoYi5oIC8gMikpO1xuICBwb2ludHMucHVzaChiLncgKyBcIixcIiArIGIuaCk7XG4gIHBvaW50cy5wdXNoKFwiMCxcIiArIGIuaCk7XG4gIGlmIChpID4gMCkgeyAvLyBMZWZ0bW9zdCBicmVhZGNydW1iOyBkb24ndCBpbmNsdWRlIDZ0aCB2ZXJ0ZXguXG4gICAgcG9pbnRzLnB1c2goYi50ICsgXCIsXCIgKyAoYi5oIC8gMikpO1xuICB9XG4gIHJldHVybiBwb2ludHMuam9pbihcIiBcIik7XG59XG5cbi8vIFVwZGF0ZSB0aGUgYnJlYWRjcnVtYiB0cmFpbCB0byBzaG93IHRoZSBjdXJyZW50IHNlcXVlbmNlIGFuZCBwZXJjZW50YWdlLlxuZnVuY3Rpb24gdXBkYXRlQnJlYWRjcnVtYnMobm9kZUFycmF5LCBwZXJjZW50YWdlU3RyaW5nKSB7XG5cbiAgLy8gRGF0YSBqb2luOyBrZXkgZnVuY3Rpb24gY29tYmluZXMgbmFtZSBhbmQgZGVwdGggKD0gcG9zaXRpb24gaW4gc2VxdWVuY2UpLlxuICBjb25zdCBnID0gZDMuc2VsZWN0KFwiI3RyYWlsXCIpXG4gICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAuZGF0YShub2RlQXJyYXksIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkLm5hbWUgKyBkLmRlcHRoO1xuICAgIH0pO1xuXG4gIC8vIEFkZCBicmVhZGNydW1iIGFuZCBsYWJlbCBmb3IgZW50ZXJpbmcgbm9kZXMuXG4gIGNvbnN0IGVudGVyaW5nID0gZy5lbnRlcigpLmFwcGVuZChcInN2ZzpnXCIpO1xuXG4gIGVudGVyaW5nLmFwcGVuZChcInN2Zzpwb2x5Z29uXCIpXG4gICAgLmF0dHIoXCJwb2ludHNcIiwgYnJlYWRjcnVtYlBvaW50cylcbiAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5uYW1lXTtcbiAgICB9KTtcblxuICBlbnRlcmluZy5hcHBlbmQoXCJzdmc6dGV4dFwiKVxuICAgIC5hdHRyKFwieFwiLCAoYi53ICsgYi50KSAvIDIpXG4gICAgLmF0dHIoXCJ5XCIsIGIuaCAvIDIpXG4gICAgLmF0dHIoXCJkeVwiLCBcIjAuMzVlbVwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gZC5uYW1lO1xuICAgIH0pO1xuXG4gIC8vIFNldCBwb3NpdGlvbiBmb3IgZW50ZXJpbmcgYW5kIHVwZGF0aW5nIG5vZGVzLlxuICBnLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIGkgKiAoYi53ICsgYi5zKSArIFwiLCAwKVwiO1xuICB9KTtcblxuICAvLyBSZW1vdmUgZXhpdGluZyBub2Rlcy5cbiAgZy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgLy8gTm93IG1vdmUgYW5kIHVwZGF0ZSB0aGUgcGVyY2VudGFnZSBhdCB0aGUgZW5kLlxuICBkMy5zZWxlY3QoXCIjdHJhaWxcIikuc2VsZWN0KFwiI2VuZGxhYmVsXCIpXG4gICAgLmF0dHIoXCJ4XCIsIChub2RlQXJyYXkubGVuZ3RoICsgMC41KSAqIChiLncgKyBiLnMpKVxuICAgIC5hdHRyKFwieVwiLCBiLmggLyAyKVxuICAgIC5hdHRyKFwiZHlcIiwgXCIwLjM1ZW1cIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLnRleHQocGVyY2VudGFnZVN0cmluZyk7XG5cbiAgLy8gTWFrZSB0aGUgYnJlYWRjcnVtYiB0cmFpbCB2aXNpYmxlLCBpZiBpdCdzIGhpZGRlbi5cbiAgZDMuc2VsZWN0KFwiI3RyYWlsXCIpXG4gICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcIlwiKTtcblxufVxuXG5mdW5jdGlvbiBkcmF3TGVnZW5kKCkge1xuXG4gIC8vIERpbWVuc2lvbnMgb2YgbGVnZW5kIGl0ZW06IHdpZHRoLCBoZWlnaHQsIHNwYWNpbmcsIHJhZGl1cyBvZiByb3VuZGVkIHJlY3QuXG4gIGNvbnN0IGxpID0ge1xuICAgIHc6IDc1LCBoOiAzMCwgczogMywgcjogMyxcbiAgfTtcblxuICBjb25zdCBsZWdlbmQgPSBkMy5zZWxlY3QoXCIjbGVnZW5kXCIpLmFwcGVuZChcInN2ZzpzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIGxpLncpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgZDMua2V5cyhjb2xvcnMpLmxlbmd0aCAqIChsaS5oICsgbGkucykpO1xuXG4gIGNvbnN0IGcgPSBsZWdlbmQuc2VsZWN0QWxsKFwiZ1wiKVxuICAgIC5kYXRhKGQzLmVudHJpZXMoY29sb3JzKSlcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJzdmc6Z1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIHJldHVybiBcInRyYW5zbGF0ZSgwLFwiICsgaSAqIChsaS5oICsgbGkucykgKyBcIilcIjtcbiAgICB9KTtcblxuICBnLmFwcGVuZChcInN2ZzpyZWN0XCIpXG4gICAgLmF0dHIoXCJyeFwiLCBsaS5yKVxuICAgIC5hdHRyKFwicnlcIiwgbGkucilcbiAgICAuYXR0cihcIndpZHRoXCIsIGxpLncpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgbGkuaClcbiAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pO1xuXG4gIGcuYXBwZW5kKFwic3ZnOnRleHRcIilcbiAgICAuYXR0cihcInhcIiwgbGkudyAvIDIpXG4gICAgLmF0dHIoXCJ5XCIsIGxpLmggLyAyKVxuICAgIC5hdHRyKFwiZHlcIiwgXCIwLjM1ZW1cIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQua2V5O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVMZWdlbmQoKSB7XG4gIGNvbnN0IGxlZ2VuZCA9IGQzLnNlbGVjdChcIiNsZWdlbmRcIik7XG4gIGlmIChsZWdlbmQuc3R5bGUoXCJ2aXNpYmlsaXR5XCIpID09IFwiaGlkZGVuXCIpIHtcbiAgICBsZWdlbmQuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIGxlZ2VuZC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLy8gVGFrZSBhIDItY29sdW1uIENTViBhbmQgdHJhbnNmb3JtIGl0IGludG8gYSBoaWVyYXJjaGljYWwgc3RydWN0dXJlIHN1aXRhYmxlXG4vLyBmb3IgYSBwYXJ0aXRpb24gbGF5b3V0LiBUaGUgZmlyc3QgY29sdW1uIGlzIGEgc2VxdWVuY2Ugb2Ygc3RlcCBuYW1lcywgZnJvbVxuLy8gcm9vdCB0byBsZWFmLCBzZXBhcmF0ZWQgYnkgaHlwaGVucy4gVGhlIHNlY29uZCBjb2x1bW4gaXMgYSBjb3VudCBvZiBob3dcbi8vIG9mdGVuIHRoYXQgc2VxdWVuY2Ugb2NjdXJyZWQuXG5mdW5jdGlvbiBidWlsZEhpZXJhcmNoeShjc3YpIHtcbiAgY29uc3Qgcm9vdCA9IHtuYW1lOiBcInJvb3RcIiwgY2hpbGRyZW46IFtdfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3YubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzZXF1ZW5jZSA9IGNzdltpXVswXTtcbiAgICBjb25zdCBzaXplID0gK2NzdltpXVsxXTtcbiAgICBpZiAoaXNOYU4oc2l6ZSkpIHsgLy8gZS5nLiBpZiB0aGlzIGlzIGEgaGVhZGVyIHJvd1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHBhcnRzID0gc2VxdWVuY2Uuc3BsaXQoXCItXCIpO1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IHJvb3Q7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBjdXJyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IG5vZGVOYW1lID0gcGFydHNbal07XG4gICAgICBsZXQgY2hpbGROb2RlO1xuICAgICAgaWYgKGogKyAxIDwgcGFydHMubGVuZ3RoKSB7XG4gICAgICAgIC8vIE5vdCB5ZXQgYXQgdGhlIGVuZCBvZiB0aGUgc2VxdWVuY2U7IG1vdmUgZG93biB0aGUgdHJlZS5cbiAgICAgICAgbGV0IGZvdW5kQ2hpbGQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjaGlsZHJlbi5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIGlmIChjaGlsZHJlbltrXS5uYW1lID09IG5vZGVOYW1lKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUgPSBjaGlsZHJlbltrXTtcbiAgICAgICAgICAgIGZvdW5kQ2hpbGQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhIGNoaWxkIG5vZGUgZm9yIHRoaXMgYnJhbmNoLCBjcmVhdGUgaXQuXG4gICAgICAgIGlmICghZm91bmRDaGlsZCkge1xuICAgICAgICAgIGNoaWxkTm9kZSA9IHtuYW1lOiBub2RlTmFtZSwgY2hpbGRyZW46IFtdfTtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudE5vZGUgPSBjaGlsZE5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZWFjaGVkIHRoZSBlbmQgb2YgdGhlIHNlcXVlbmNlOyBjcmVhdGUgYSBsZWFmIG5vZGUuXG4gICAgICAgIGNoaWxkTm9kZSA9IHtuYW1lOiBub2RlTmFtZSwgc2l6ZX07XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGROb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJvb3Q7XG59XG4iXX0=