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
    exports.__esModule = true;
    var d3 = require("d3v4");
    // Dimensions of sunburst.
    var width = 750;
    var height = 600;
    var radius = Math.min(width, height) / 2;
    // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    var b = {
        w: 75, h: 30, s: 3, t: 10
    };
    // Mapping of step names to colors.
    var colors = {
        home: "#5687d1",
        product: "#7b615c",
        search: "#de783b",
        account: "#6ab975",
        other: "#a173d1",
        end: "#bbbbbb"
    };
    // Total size of all segments; we set this later, after loading the data.
    var totalSize = 0;
    var vis = d3.select("#chart").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("id", "container")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var partition = d3.layout.partition()
        .size([2 * Math.PI, radius * radius])
        .value(function (d) { return d.size; });
    var arc = d3.svg.arc()
        .startAngle(function (d) { return d.x; })
        .endAngle(function (d) { return d.x + d.dx; })
        .innerRadius(function (d) { return Math.sqrt(d.y); })
        .outerRadius(function (d) { return Math.sqrt(d.y + d.dy); });
    // Use d3.text and d3.csv.parseRows so that we do not need to have a header
    // row, and can receive the csv as an array of arrays.
    d3.text("visit-sequences.csv", function (text) {
        var csv = d3.csv.parseRows(text);
        var json = buildHierarchy(csv);
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
        var nodes = partition.nodes(json)
            .filter(function (d) {
            return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
        });
        var path = vis.data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("display", function (d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function (d) { return colors[d.name]; })
            .style("opacity", 1)
            .on("mouseover", mouseover);
        // Add the mouseleave handler to the bounding circle.
        d3.select("#container").on("mouseleave", mouseleave);
        // Get total size of the tree = value of root node from partition.
        totalSize = path.node().__data__.value;
    }
    // Fade all but the current sequence, and show it in the breadcrumb trail.
    function mouseover(d) {
        var percentage = (100 * d.value / totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (percentage < 0.1) {
            percentageString = "< 0.1%";
        }
        d3.select("#percentage")
            .text(percentageString);
        d3.select("#explanation")
            .style("visibility", "");
        var sequenceArray = getAncestors(d);
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
        var path = [];
        var current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }
    function initializeBreadcrumbTrail() {
        // Add the svg area.
        var trail = d3.select("#sequence").append("svg:svg")
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
        var points = [];
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
        var g = d3.select("#trail")
            .selectAll("g")
            .data(nodeArray, function (d) { return d.name + d.depth; });
        // Add breadcrumb and label for entering nodes.
        var entering = g.enter().append("svg:g");
        entering.append("svg:polygon")
            .attr("points", breadcrumbPoints)
            .style("fill", function (d) { return colors[d.name]; });
        entering.append("svg:text")
            .attr("x", (b.w + b.t) / 2)
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(function (d) { return d.name; });
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
        var li = {
            w: 75, h: 30, s: 3, r: 3
        };
        var legend = d3.select("#legend").append("svg:svg")
            .attr("width", li.w)
            .attr("height", d3.keys(colors).length * (li.h + li.s));
        var g = legend.selectAll("g")
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
            .style("fill", function (d) { return d.value; });
        g.append("svg:text")
            .attr("x", li.w / 2)
            .attr("y", li.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(function (d) { return d.key; });
    }
    function toggleLegend() {
        var legend = d3.select("#legend");
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
        var root = { name: "root", children: [] };
        for (var i = 0; i < csv.length; i++) {
            var sequence = csv[i][0];
            var size = +csv[i][1];
            if (isNaN(size)) { // e.g. if this is a header row
                continue;
            }
            var parts = sequence.split("-");
            var currentNode = root;
            for (var j = 0; j < parts.length; j++) {
                var children = currentNode.children;
                var nodeName = parts[j];
                var childNode = void 0;
                if (j + 1 < parts.length) {
                    // Not yet at the end of the sequence; move down the tree.
                    var foundChild = false;
                    for (var k = 0; k < children.length; k++) {
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
                    childNode = { name: nodeName, size: size };
                    children.push(childNode);
                }
            }
        }
        return root;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29tZWdyYXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2QzL3NvbWVncmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlCQUEyQjtJQUUzQiwwQkFBMEI7SUFDMUIsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNuQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFM0Msb0VBQW9FO0lBQ3BFLElBQU0sQ0FBQyxHQUFHO1FBQ1IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7S0FDMUIsQ0FBQztJQUVGLG1DQUFtQztJQUNuQyxJQUFNLE1BQU0sR0FBRztRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsR0FBRyxFQUFFLFNBQVM7S0FDZixDQUFDO0lBRUYseUVBQXlFO0lBQ3pFLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUVsQixJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDOUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7U0FDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7U0FDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNmLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDO1NBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1B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QVMsR0FBRyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQztvQkFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDMUI7YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzdjRcIjtcblxuLy8gRGltZW5zaW9ucyBvZiBzdW5idXJzdC5cbmNvbnN0IHdpZHRoID0gNzUwO1xuY29uc3QgaGVpZ2h0ID0gNjAwO1xuY29uc3QgcmFkaXVzID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyO1xuXG4vLyBCcmVhZGNydW1iIGRpbWVuc2lvbnM6IHdpZHRoLCBoZWlnaHQsIHNwYWNpbmcsIHdpZHRoIG9mIHRpcC90YWlsLlxuY29uc3QgYiA9IHtcbiAgdzogNzUsIGg6IDMwLCBzOiAzLCB0OiAxMCxcbn07XG5cbi8vIE1hcHBpbmcgb2Ygc3RlcCBuYW1lcyB0byBjb2xvcnMuXG5jb25zdCBjb2xvcnMgPSB7XG4gIGhvbWU6IFwiIzU2ODdkMVwiLFxuICBwcm9kdWN0OiBcIiM3YjYxNWNcIixcbiAgc2VhcmNoOiBcIiNkZTc4M2JcIixcbiAgYWNjb3VudDogXCIjNmFiOTc1XCIsXG4gIG90aGVyOiBcIiNhMTczZDFcIixcbiAgZW5kOiBcIiNiYmJiYmJcIixcbn07XG5cbi8vIFRvdGFsIHNpemUgb2YgYWxsIHNlZ21lbnRzOyB3ZSBzZXQgdGhpcyBsYXRlciwgYWZ0ZXIgbG9hZGluZyB0aGUgZGF0YS5cbmxldCB0b3RhbFNpemUgPSAwO1xuXG5jb25zdCB2aXMgPSBkMy5zZWxlY3QoXCIjY2hhcnRcIikuYXBwZW5kKFwic3ZnOnN2Z1wiKVxuICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gIC5hcHBlbmQoXCJzdmc6Z1wiKVxuICAuYXR0cihcImlkXCIsIFwiY29udGFpbmVyXCIpXG4gIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpO1xuXG5jb25zdCBwYXJ0aXRpb24gPSBkMy5sYXlvdXQucGFydGl0aW9uKClcbiAgLnNpemUoWzIgKiBNYXRoLlBJLCByYWRpdXMgKiByYWRpdXNdKVxuICAudmFsdWUoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zaXplOyB9KTtcblxuY29uc3QgYXJjID0gZDMuc3ZnLmFyYygpXG4gIC5zdGFydEFuZ2xlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueDsgfSlcbiAgLmVuZEFuZ2xlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueCArIGQuZHg7IH0pXG4gIC5pbm5lclJhZGl1cyhmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLnNxcnQoZC55KTsgfSlcbiAgLm91dGVyUmFkaXVzKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGguc3FydChkLnkgKyBkLmR5KTsgfSk7XG5cbi8vIFVzZSBkMy50ZXh0IGFuZCBkMy5jc3YucGFyc2VSb3dzIHNvIHRoYXQgd2UgZG8gbm90IG5lZWQgdG8gaGF2ZSBhIGhlYWRlclxuLy8gcm93LCBhbmQgY2FuIHJlY2VpdmUgdGhlIGNzdiBhcyBhbiBhcnJheSBvZiBhcnJheXMuXG5kMy50ZXh0KFwidmlzaXQtc2VxdWVuY2VzLmNzdlwiLCBmdW5jdGlvbih0ZXh0KSB7XG4gIGNvbnN0IGNzdiA9IGQzLmNzdi5wYXJzZVJvd3ModGV4dCk7XG4gIGNvbnN0IGpzb24gPSBidWlsZEhpZXJhcmNoeShjc3YpO1xuICBjcmVhdGVWaXN1YWxpemF0aW9uKGpzb24pO1xufSk7XG5cbi8vIE1haW4gZnVuY3Rpb24gdG8gZHJhdyBhbmQgc2V0IHVwIHRoZSB2aXN1YWxpemF0aW9uLCBvbmNlIHdlIGhhdmUgdGhlIGRhdGEuXG5mdW5jdGlvbiBjcmVhdGVWaXN1YWxpemF0aW9uKGpzb24pIHtcblxuICAvLyBCYXNpYyBzZXR1cCBvZiBwYWdlIGVsZW1lbnRzLlxuICBpbml0aWFsaXplQnJlYWRjcnVtYlRyYWlsKCk7XG4gIGRyYXdMZWdlbmQoKTtcbiAgZDMuc2VsZWN0KFwiI3RvZ2dsZWxlZ2VuZFwiKS5vbihcImNsaWNrXCIsIHRvZ2dsZUxlZ2VuZCk7XG5cbiAgLy8gQm91bmRpbmcgY2lyY2xlIHVuZGVybmVhdGggdGhlIHN1bmJ1cnN0LCB0byBtYWtlIGl0IGVhc2llciB0byBkZXRlY3RcbiAgLy8gd2hlbiB0aGUgbW91c2UgbGVhdmVzIHRoZSBwYXJlbnQgZy5cbiAgdmlzLmFwcGVuZChcInN2ZzpjaXJjbGVcIilcbiAgICAuYXR0cihcInJcIiwgcmFkaXVzKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgLy8gRm9yIGVmZmljaWVuY3ksIGZpbHRlciBub2RlcyB0byBrZWVwIG9ubHkgdGhvc2UgbGFyZ2UgZW5vdWdoIHRvIHNlZS5cbiAgY29uc3Qgbm9kZXMgPSBwYXJ0aXRpb24ubm9kZXMoanNvbilcbiAgICAuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiAoZC5keCA+IDAuMDA1KTsgLy8gMC4wMDUgcmFkaWFucyA9IDAuMjkgZGVncmVlc1xuICAgIH0pO1xuXG4gIGNvbnN0IHBhdGggPSB2aXMuZGF0YShbanNvbl0pLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAuZGF0YShub2RlcylcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJzdmc6cGF0aFwiKVxuICAgIC5hdHRyKFwiZGlzcGxheVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmRlcHRoID8gbnVsbCA6IFwibm9uZVwiOyB9KVxuICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgLmF0dHIoXCJmaWxsLXJ1bGVcIiwgXCJldmVub2RkXCIpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBjb2xvcnNbZC5uYW1lXTsgfSlcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpXG4gICAgLm9uKFwibW91c2VvdmVyXCIsIG1vdXNlb3Zlcik7XG5cbiAgLy8gQWRkIHRoZSBtb3VzZWxlYXZlIGhhbmRsZXIgdG8gdGhlIGJvdW5kaW5nIGNpcmNsZS5cbiAgZDMuc2VsZWN0KFwiI2NvbnRhaW5lclwiKS5vbihcIm1vdXNlbGVhdmVcIiwgbW91c2VsZWF2ZSk7XG5cbiAgLy8gR2V0IHRvdGFsIHNpemUgb2YgdGhlIHRyZWUgPSB2YWx1ZSBvZiByb290IG5vZGUgZnJvbSBwYXJ0aXRpb24uXG4gIHRvdGFsU2l6ZSA9IHBhdGgubm9kZSgpLl9fZGF0YV9fLnZhbHVlO1xufVxuXG4vLyBGYWRlIGFsbCBidXQgdGhlIGN1cnJlbnQgc2VxdWVuY2UsIGFuZCBzaG93IGl0IGluIHRoZSBicmVhZGNydW1iIHRyYWlsLlxuZnVuY3Rpb24gbW91c2VvdmVyKGQpIHtcblxuICBjb25zdCBwZXJjZW50YWdlID0gKDEwMCAqIGQudmFsdWUgLyB0b3RhbFNpemUpLnRvUHJlY2lzaW9uKDMpO1xuICBsZXQgcGVyY2VudGFnZVN0cmluZyA9IHBlcmNlbnRhZ2UgKyBcIiVcIjtcbiAgaWYgKHBlcmNlbnRhZ2UgPCAwLjEpIHtcbiAgICBwZXJjZW50YWdlU3RyaW5nID0gXCI8IDAuMSVcIjtcbiAgfVxuXG4gIGQzLnNlbGVjdChcIiNwZXJjZW50YWdlXCIpXG4gICAgLnRleHQocGVyY2VudGFnZVN0cmluZyk7XG5cbiAgZDMuc2VsZWN0KFwiI2V4cGxhbmF0aW9uXCIpXG4gICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcIlwiKTtcblxuICBjb25zdCBzZXF1ZW5jZUFycmF5ID0gZ2V0QW5jZXN0b3JzKGQpO1xuICB1cGRhdGVCcmVhZGNydW1icyhzZXF1ZW5jZUFycmF5LCBwZXJjZW50YWdlU3RyaW5nKTtcblxuICAvLyBGYWRlIGFsbCB0aGUgc2VnbWVudHMuXG4gIGQzLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDAuMyk7XG5cbiAgLy8gVGhlbiBoaWdobGlnaHQgb25seSB0aG9zZSB0aGF0IGFyZSBhbiBhbmNlc3RvciBvZiB0aGUgY3VycmVudCBzZWdtZW50LlxuICB2aXMuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24obm9kZSkge1xuICAgICAgcmV0dXJuIChzZXF1ZW5jZUFycmF5LmluZGV4T2Yobm9kZSkgPj0gMCk7XG4gICAgfSlcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xufVxuXG4vLyBSZXN0b3JlIGV2ZXJ5dGhpbmcgdG8gZnVsbCBvcGFjaXR5IHdoZW4gbW92aW5nIG9mZiB0aGUgdmlzdWFsaXphdGlvbi5cbmZ1bmN0aW9uIG1vdXNlbGVhdmUoZCkge1xuXG4gIC8vIEhpZGUgdGhlIGJyZWFkY3J1bWIgdHJhaWxcbiAgZDMuc2VsZWN0KFwiI3RyYWlsXCIpXG4gICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcblxuICAvLyBEZWFjdGl2YXRlIGFsbCBzZWdtZW50cyBkdXJpbmcgdHJhbnNpdGlvbi5cbiAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKS5vbihcIm1vdXNlb3ZlclwiLCBudWxsKTtcblxuICAvLyBUcmFuc2l0aW9uIGVhY2ggc2VnbWVudCB0byBmdWxsIG9wYWNpdHkgYW5kIHRoZW4gcmVhY3RpdmF0ZSBpdC5cbiAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oMTAwMClcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpXG4gICAgLmVhY2goXCJlbmRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBkMy5zZWxlY3QodGhpcykub24oXCJtb3VzZW92ZXJcIiwgbW91c2VvdmVyKTtcbiAgICB9KTtcblxuICBkMy5zZWxlY3QoXCIjZXhwbGFuYXRpb25cIilcbiAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xufVxuXG4vLyBHaXZlbiBhIG5vZGUgaW4gYSBwYXJ0aXRpb24gbGF5b3V0LCByZXR1cm4gYW4gYXJyYXkgb2YgYWxsIG9mIGl0cyBhbmNlc3RvclxuLy8gbm9kZXMsIGhpZ2hlc3QgZmlyc3QsIGJ1dCBleGNsdWRpbmcgdGhlIHJvb3QuXG5mdW5jdGlvbiBnZXRBbmNlc3RvcnMobm9kZSkge1xuICBjb25zdCBwYXRoID0gW107XG4gIGxldCBjdXJyZW50ID0gbm9kZTtcbiAgd2hpbGUgKGN1cnJlbnQucGFyZW50KSB7XG4gICAgcGF0aC51bnNoaWZ0KGN1cnJlbnQpO1xuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUJyZWFkY3J1bWJUcmFpbCgpIHtcbiAgLy8gQWRkIHRoZSBzdmcgYXJlYS5cbiAgY29uc3QgdHJhaWwgPSBkMy5zZWxlY3QoXCIjc2VxdWVuY2VcIikuYXBwZW5kKFwic3ZnOnN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgNTApXG4gICAgLmF0dHIoXCJpZFwiLCBcInRyYWlsXCIpO1xuICAvLyBBZGQgdGhlIGxhYmVsIGF0IHRoZSBlbmQsIGZvciB0aGUgcGVyY2VudGFnZS5cbiAgdHJhaWwuYXBwZW5kKFwic3ZnOnRleHRcIilcbiAgICAuYXR0cihcImlkXCIsIFwiZW5kbGFiZWxcIilcbiAgICAuc3R5bGUoXCJmaWxsXCIsIFwiIzAwMFwiKTtcbn1cblxuLy8gR2VuZXJhdGUgYSBzdHJpbmcgdGhhdCBkZXNjcmliZXMgdGhlIHBvaW50cyBvZiBhIGJyZWFkY3J1bWIgcG9seWdvbi5cbmZ1bmN0aW9uIGJyZWFkY3J1bWJQb2ludHMoZCwgaSkge1xuICBjb25zdCBwb2ludHMgPSBbXTtcbiAgcG9pbnRzLnB1c2goXCIwLDBcIik7XG4gIHBvaW50cy5wdXNoKGIudyArIFwiLDBcIik7XG4gIHBvaW50cy5wdXNoKGIudyArIGIudCArIFwiLFwiICsgKGIuaCAvIDIpKTtcbiAgcG9pbnRzLnB1c2goYi53ICsgXCIsXCIgKyBiLmgpO1xuICBwb2ludHMucHVzaChcIjAsXCIgKyBiLmgpO1xuICBpZiAoaSA+IDApIHsgLy8gTGVmdG1vc3QgYnJlYWRjcnVtYjsgZG9uJ3QgaW5jbHVkZSA2dGggdmVydGV4LlxuICAgIHBvaW50cy5wdXNoKGIudCArIFwiLFwiICsgKGIuaCAvIDIpKTtcbiAgfVxuICByZXR1cm4gcG9pbnRzLmpvaW4oXCIgXCIpO1xufVxuXG4vLyBVcGRhdGUgdGhlIGJyZWFkY3J1bWIgdHJhaWwgdG8gc2hvdyB0aGUgY3VycmVudCBzZXF1ZW5jZSBhbmQgcGVyY2VudGFnZS5cbmZ1bmN0aW9uIHVwZGF0ZUJyZWFkY3J1bWJzKG5vZGVBcnJheSwgcGVyY2VudGFnZVN0cmluZykge1xuXG4gIC8vIERhdGEgam9pbjsga2V5IGZ1bmN0aW9uIGNvbWJpbmVzIG5hbWUgYW5kIGRlcHRoICg9IHBvc2l0aW9uIGluIHNlcXVlbmNlKS5cbiAgY29uc3QgZyA9IGQzLnNlbGVjdChcIiN0cmFpbFwiKVxuICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgLmRhdGEobm9kZUFycmF5LCBmdW5jdGlvbihkKSB7IHJldHVybiBkLm5hbWUgKyBkLmRlcHRoOyB9KTtcblxuICAvLyBBZGQgYnJlYWRjcnVtYiBhbmQgbGFiZWwgZm9yIGVudGVyaW5nIG5vZGVzLlxuICBjb25zdCBlbnRlcmluZyA9IGcuZW50ZXIoKS5hcHBlbmQoXCJzdmc6Z1wiKTtcblxuICBlbnRlcmluZy5hcHBlbmQoXCJzdmc6cG9seWdvblwiKVxuICAgIC5hdHRyKFwicG9pbnRzXCIsIGJyZWFkY3J1bWJQb2ludHMpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBjb2xvcnNbZC5uYW1lXTsgfSk7XG5cbiAgZW50ZXJpbmcuYXBwZW5kKFwic3ZnOnRleHRcIilcbiAgICAuYXR0cihcInhcIiwgKGIudyArIGIudCkgLyAyKVxuICAgIC5hdHRyKFwieVwiLCBiLmggLyAyKVxuICAgIC5hdHRyKFwiZHlcIiwgXCIwLjM1ZW1cIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLnRleHQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5uYW1lOyB9KTtcblxuICAvLyBTZXQgcG9zaXRpb24gZm9yIGVudGVyaW5nIGFuZCB1cGRhdGluZyBub2Rlcy5cbiAgZy5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBpICogKGIudyArIGIucykgKyBcIiwgMClcIjtcbiAgfSk7XG5cbiAgLy8gUmVtb3ZlIGV4aXRpbmcgbm9kZXMuXG4gIGcuZXhpdCgpLnJlbW92ZSgpO1xuXG4gIC8vIE5vdyBtb3ZlIGFuZCB1cGRhdGUgdGhlIHBlcmNlbnRhZ2UgYXQgdGhlIGVuZC5cbiAgZDMuc2VsZWN0KFwiI3RyYWlsXCIpLnNlbGVjdChcIiNlbmRsYWJlbFwiKVxuICAgIC5hdHRyKFwieFwiLCAobm9kZUFycmF5Lmxlbmd0aCArIDAuNSkgKiAoYi53ICsgYi5zKSlcbiAgICAuYXR0cihcInlcIiwgYi5oIC8gMilcbiAgICAuYXR0cihcImR5XCIsIFwiMC4zNWVtXCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC50ZXh0KHBlcmNlbnRhZ2VTdHJpbmcpO1xuXG4gIC8vIE1ha2UgdGhlIGJyZWFkY3J1bWIgdHJhaWwgdmlzaWJsZSwgaWYgaXQncyBoaWRkZW4uXG4gIGQzLnNlbGVjdChcIiN0cmFpbFwiKVxuICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJcIik7XG5cbn1cblxuZnVuY3Rpb24gZHJhd0xlZ2VuZCgpIHtcblxuICAvLyBEaW1lbnNpb25zIG9mIGxlZ2VuZCBpdGVtOiB3aWR0aCwgaGVpZ2h0LCBzcGFjaW5nLCByYWRpdXMgb2Ygcm91bmRlZCByZWN0LlxuICBjb25zdCBsaSA9IHtcbiAgICB3OiA3NSwgaDogMzAsIHM6IDMsIHI6IDMsXG4gIH07XG5cbiAgY29uc3QgbGVnZW5kID0gZDMuc2VsZWN0KFwiI2xlZ2VuZFwiKS5hcHBlbmQoXCJzdmc6c3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBsaS53KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGQzLmtleXMoY29sb3JzKS5sZW5ndGggKiAobGkuaCArIGxpLnMpKTtcblxuICBjb25zdCBnID0gbGVnZW5kLnNlbGVjdEFsbChcImdcIilcbiAgICAuZGF0YShkMy5lbnRyaWVzKGNvbG9ycykpXG4gICAgLmVudGVyKCkuYXBwZW5kKFwic3ZnOmdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMCxcIiArIGkgKiAobGkuaCArIGxpLnMpICsgXCIpXCI7XG4gICAgfSk7XG5cbiAgZy5hcHBlbmQoXCJzdmc6cmVjdFwiKVxuICAgIC5hdHRyKFwicnhcIiwgbGkucilcbiAgICAuYXR0cihcInJ5XCIsIGxpLnIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBsaS53KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGxpLmgpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnZhbHVlOyB9KTtcblxuICBnLmFwcGVuZChcInN2Zzp0ZXh0XCIpXG4gICAgLmF0dHIoXCJ4XCIsIGxpLncgLyAyKVxuICAgIC5hdHRyKFwieVwiLCBsaS5oIC8gMilcbiAgICAuYXR0cihcImR5XCIsIFwiMC4zNWVtXCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQua2V5OyB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlTGVnZW5kKCkge1xuICBjb25zdCBsZWdlbmQgPSBkMy5zZWxlY3QoXCIjbGVnZW5kXCIpO1xuICBpZiAobGVnZW5kLnN0eWxlKFwidmlzaWJpbGl0eVwiKSA9PSBcImhpZGRlblwiKSB7XG4gICAgbGVnZW5kLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICBsZWdlbmQuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8vIFRha2UgYSAyLWNvbHVtbiBDU1YgYW5kIHRyYW5zZm9ybSBpdCBpbnRvIGEgaGllcmFyY2hpY2FsIHN0cnVjdHVyZSBzdWl0YWJsZVxuLy8gZm9yIGEgcGFydGl0aW9uIGxheW91dC4gVGhlIGZpcnN0IGNvbHVtbiBpcyBhIHNlcXVlbmNlIG9mIHN0ZXAgbmFtZXMsIGZyb21cbi8vIHJvb3QgdG8gbGVhZiwgc2VwYXJhdGVkIGJ5IGh5cGhlbnMuIFRoZSBzZWNvbmQgY29sdW1uIGlzIGEgY291bnQgb2YgaG93XG4vLyBvZnRlbiB0aGF0IHNlcXVlbmNlIG9jY3VycmVkLlxuZnVuY3Rpb24gYnVpbGRIaWVyYXJjaHkoY3N2KSB7XG4gIGNvbnN0IHJvb3QgPSB7bmFtZTogXCJyb290XCIsIGNoaWxkcmVuOiBbXX07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3N2Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc2VxdWVuY2UgPSBjc3ZbaV1bMF07XG4gICAgY29uc3Qgc2l6ZSA9ICtjc3ZbaV1bMV07XG4gICAgaWYgKGlzTmFOKHNpemUpKSB7IC8vIGUuZy4gaWYgdGhpcyBpcyBhIGhlYWRlciByb3dcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCBwYXJ0cyA9IHNlcXVlbmNlLnNwbGl0KFwiLVwiKTtcbiAgICBsZXQgY3VycmVudE5vZGUgPSByb290O1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gY3VycmVudE5vZGUuY2hpbGRyZW47XG4gICAgICBjb25zdCBub2RlTmFtZSA9IHBhcnRzW2pdO1xuICAgICAgbGV0IGNoaWxkTm9kZTtcbiAgICAgIGlmIChqICsgMSA8IHBhcnRzLmxlbmd0aCkge1xuICAgICAgICAvLyBOb3QgeWV0IGF0IHRoZSBlbmQgb2YgdGhlIHNlcXVlbmNlOyBtb3ZlIGRvd24gdGhlIHRyZWUuXG4gICAgICAgIGxldCBmb3VuZENoaWxkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY2hpbGRyZW4ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICBpZiAoY2hpbGRyZW5ba10ubmFtZSA9PSBub2RlTmFtZSkge1xuICAgICAgICAgICAgY2hpbGROb2RlID0gY2hpbGRyZW5ba107XG4gICAgICAgICAgICBmb3VuZENoaWxkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgYSBjaGlsZCBub2RlIGZvciB0aGlzIGJyYW5jaCwgY3JlYXRlIGl0LlxuICAgICAgICBpZiAoIWZvdW5kQ2hpbGQpIHtcbiAgICAgICAgICBjaGlsZE5vZGUgPSB7bmFtZTogbm9kZU5hbWUsIGNoaWxkcmVuOiBbXX07XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnROb2RlID0gY2hpbGROb2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBzZXF1ZW5jZTsgY3JlYXRlIGEgbGVhZiBub2RlLlxuICAgICAgICBjaGlsZE5vZGUgPSB7bmFtZTogbm9kZU5hbWUsIHNpemV9O1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByb290O1xufVxuIl19