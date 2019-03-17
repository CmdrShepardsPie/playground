"use strict";
function getNumber(reg, text) {
    if (text && text.match) {
        var match = text.match(reg);
        return parseFloat(match[match.length - 1], 10);
    }
    return NaN;
}
var allData = [];
// MyGMRS
// const tables = document.querySelectorAll('table.advancedSearchTable');
// RepeaterBook
var tables = document.querySelectorAll("table.w3-table.w3-striped.w3-responsive");
tables.forEach(function (table, tableIndex) {
    var rows = table.querySelectorAll("tbody > tr");
    rows.forEach(function (row, rowIndex) {
        var data = {
            Location: allData.length + 1,
            Name: null,
            Frequency: null,
            Duplex: "",
            Offset: 0,
            Tone: null,
            rToneFreq: 88.5,
            cToneFreq: 88.5,
            DtcsCode: 23,
            DtscRxCode: 23,
            DtcsPolarity: "NN",
            Mode: "FM",
            TStep: 5,
            // Skip: null,
            Comment: null
        };
        var cells = row.querySelectorAll("td");
        cells.forEach(function (cell, cellIndex) {
            var Frequency = /([-+]?\d+\.?\d*)/;
            var CC = /CC(\d+)/;
            var DTSC = /D(\d+)/;
            var Tone = /(\d+\.?\d*)/;
            var text = cell.innerText;
            switch (cellIndex) {
                case 0:
                    // Frequency
                    data.Frequency = getNumber(Frequency, text);
                    break;
                case 1:
                    var number = getNumber(Frequency, text);
                    // Offset
                    if (number > 0) {
                        data.Duplex = "+";
                        data.Offset = number;
                    }
                    else if (number < 0) {
                        data.Duplex = "-";
                        data.Offset = Math.abs(number);
                    }
                    break;
                case 2:
                    // Tone
                    if (CC.test(text)) {
                        data.Mode = "DIG";
                    }
                    if (DTSC.test(text)) {
                        var number_1 = getNumber(DTSC, text);
                        data.DtcsCode = number_1;
                        data.DtscRxCode = number_1;
                        data.Tone = "DTCS";
                    }
                    else if (!CC.test(text) && !DTSC.test(text) && Tone.test(text)) {
                        var number_2 = getNumber(Tone, text);
                        data.rToneFreq = number_2;
                        data.cToneFreq = number_2;
                        data.Tone = "Tone";
                    }
                    break;
                case 3:
                    // Call
                    data.Name = text;
                    break;
                case 4:
                    // Location
                    data.Comment = text;
                    break;
                case 5:
                    // State
                    data.Comment = data.Comment + " " + text;
                    break;
                case 6:
                    // Use
                    data.Comment = data.Comment + " " + text;
                    break;
                case 7:
                    // VOIP
                    data.Comment = data.Comment + " " + text;
                    break;
            }
            // } else {
            //   switch (cellIndex) {
            //     case 0:
            //       // Location
            //       data.Comment = text;
            //       break;
            //     case 1:
            //       // Status
            //       break;
            //     case 2:
            //       break;
            //   }
            // }
            // switch (x) {
            //   case 0:
            //     // Frequency
            //     data.Frequency = numberFilter;
            //     break;
            //   case 1:
            //     // Offset
            //     data.Duplex = numberFilter < 0 ? '-' : '+';
            //     data.Offset = Math.abs(numberFilter);
            //     break;
            //   case 2:
            //     // Tone
            //     const isDTSC = /D\d+/;
            //     if (isDTSC.test(text)) {
            //       data.Tone = 'DTSC'
            //     }
            //     break;
            //   case 3:
            //     // Call
            //     break;
            //   case 4:
            //     // Location
            //     break;
            //   case 5:
            //     // ST/PR
            //     break;
            //   case 6:
            //     // Use
            //     break;
            //   case 7:
            //     // VOIP
            //     break;
            //   case 8:
            //     // Mi
            //     break;
            //   case 9:
            //     // Status
            //     break;
            // }
        });
        allData.push(data);
    });
});
// allData.sort((a, b) => a.Frequency - b.Frequency);
// allData.forEach((a, i) => a.Location = i);
JSON.stringify(allData);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyYXBlLXJlcGVhdGVyLXJlcGVhdGVyYm9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY3JhcGUtcmVwZWF0ZXItcmVwZWF0ZXJib29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSTtJQUMxQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ3RCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDaEQ7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbkIsU0FBUztBQUNULHlFQUF5RTtBQUN6RSxlQUFlO0FBQ2YsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDcEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxVQUFVO0lBQy9CLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLFFBQVE7UUFDekIsSUFBTSxJQUFJLEdBQUc7WUFDWCxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzVCLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsRUFBRTtZQUNWLE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFV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bWJlcihyZWcsIHRleHQpIHtcbiAgaWYgKHRleHQgJiYgdGV4dC5tYXRjaCkge1xuICAgIGNvbnN0IG1hdGNoID0gdGV4dC5tYXRjaChyZWcpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoW21hdGNoLmxlbmd0aCAtIDFdLCAxMCk7XG4gIH1cbiAgcmV0dXJuIE5hTjtcbn1cbmNvbnN0IGFsbERhdGEgPSBbXTtcbi8vIE15R01SU1xuLy8gY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGUuYWR2YW5jZWRTZWFyY2hUYWJsZScpO1xuLy8gUmVwZWF0ZXJCb29rXG5jb25zdCB0YWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGFibGUudzMtdGFibGUudzMtc3RyaXBlZC53My1yZXNwb25zaXZlXCIpO1xudGFibGVzLmZvckVhY2goKHRhYmxlLCB0YWJsZUluZGV4KSA9PiB7XG4gIGNvbnN0IHJvd3MgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwidGJvZHkgPiB0clwiKTtcbiAgcm93cy5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIExvY2F0aW9uOiBhbGxEYXRhLmxlbmd0aCArIDEsXG4gICAgICBOYW1lOiBudWxsLFxuICAgICAgRnJlcXVlbmN5OiBudWxsLFxuICAgICAgRHVwbGV4OiBcIlwiLFxuICAgICAgT2Zmc2V0OiAwLFxuICAgICAgVG9uZTogbnVsbCxcbiAgICAgIHJUb25lRnJlcTogODguNSxcbiAgICAgIGNUb25lRnJlcTogODguNSxcbiAgICAgIER0Y3NDb2RlOiAyMyxcbiAgICAgIER0c2NSeENvZGU6IDIzLFxuICAgICAgRHRjc1BvbGFyaXR5OiBcIk5OXCIsXG4gICAgICBNb2RlOiBcIkZNXCIsXG4gICAgICBUU3RlcDogNSxcbiAgICAgIC8vIFNraXA6IG51bGwsXG4gICAgICBDb21tZW50OiBudWxsLFxuICAgICAgLy8gVVJDQUxMOiBudWxsLFxuICAgICAgLy8gUlBUMUNBTEw6IG51bGwsXG4gICAgICAvLyBSUFQyQ0FMTDogbnVsbCxcbiAgICAgIC8vIERWQ09ERTogbnVsbFxuICAgIH07XG5cbiAgICBjb25zdCBjZWxscyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIik7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgY2VsbEluZGV4KSA9PiB7XG4gICAgICBjb25zdCBGcmVxdWVuY3kgPSAvKFstK10/XFxkK1xcLj9cXGQqKS87XG4gICAgICBjb25zdCBDQyA9IC9DQyhcXGQrKS87XG4gICAgICBjb25zdCBEVFNDID0gL0QoXFxkKykvO1xuICAgICAgY29uc3QgVG9uZSA9IC8oXFxkK1xcLj9cXGQqKS87XG4gICAgICBjb25zdCB0ZXh0ID0gY2VsbC5pbm5lclRleHQ7XG4gICAgICBzd2l0Y2ggKGNlbGxJbmRleCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgLy8gRnJlcXVlbmN5XG4gICAgICAgICAgZGF0YS5GcmVxdWVuY3kgPSBnZXROdW1iZXIoRnJlcXVlbmN5LCB0ZXh0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGNvbnN0IG51bWJlciA9IGdldE51bWJlcihGcmVxdWVuY3ksIHRleHQpO1xuICAgICAgICAgIC8vIE9mZnNldFxuICAgICAgICAgIGlmIChudW1iZXIgPiAwKSB7XG4gICAgICAgICAgICBkYXRhLkR1cGxleCA9IFwiK1wiO1xuICAgICAgICAgICAgZGF0YS5PZmZzZXQgPSBudW1iZXI7XG4gICAgICAgICAgfSBlbHNlIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICBkYXRhLkR1cGxleCA9IFwiLVwiO1xuICAgICAgICAgICAgZGF0YS5PZmZzZXQgPSBNYXRoLmFicyhudW1iZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIC8vIFRvbmVcbiAgICAgICAgICBpZiAoQ0MudGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgZGF0YS5Nb2RlID0gXCJESUdcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKERUU0MudGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgY29uc3QgbnVtYmVyID0gZ2V0TnVtYmVyKERUU0MsIHRleHQpO1xuICAgICAgICAgICAgZGF0YS5EdGNzQ29kZSA9IG51bWJlcjtcbiAgICAgICAgICAgIGRhdGEuRHRzY1J4Q29kZSA9IG51bWJlcjtcbiAgICAgICAgICAgIGRhdGEuVG9uZSA9IFwiRFRDU1wiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIUNDLnRlc3QodGV4dCkgJiYgIURUU0MudGVzdCh0ZXh0KSAmJiBUb25lLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bWJlciA9IGdldE51bWJlcihUb25lLCB0ZXh0KTtcbiAgICAgICAgICAgIGRhdGEuclRvbmVGcmVxID0gbnVtYmVyO1xuICAgICAgICAgICAgZGF0YS5jVG9uZUZyZXEgPSBudW1iZXI7XG4gICAgICAgICAgICBkYXRhLlRvbmUgPSBcIlRvbmVcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAvLyBDYWxsXG4gICAgICAgICAgZGF0YS5OYW1lID0gdGV4dDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIC8vIExvY2F0aW9uXG4gICAgICAgICAgZGF0YS5Db21tZW50ID0gdGV4dDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIC8vIFN0YXRlXG4gICAgICAgICAgZGF0YS5Db21tZW50ID0gYCR7ZGF0YS5Db21tZW50fSAke3RleHR9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgIC8vIFVzZVxuICAgICAgICAgIGRhdGEuQ29tbWVudCA9IGAke2RhdGEuQ29tbWVudH0gJHt0ZXh0fWA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAvLyBWT0lQXG4gICAgICAgICAgZGF0YS5Db21tZW50ID0gYCR7ZGF0YS5Db21tZW50fSAke3RleHR9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIHN3aXRjaCAoY2VsbEluZGV4KSB7XG4gICAgICAvLyAgICAgY2FzZSAwOlxuICAgICAgLy8gICAgICAgLy8gTG9jYXRpb25cbiAgICAgIC8vICAgICAgIGRhdGEuQ29tbWVudCA9IHRleHQ7XG4gICAgICAvLyAgICAgICBicmVhaztcbiAgICAgIC8vICAgICBjYXNlIDE6XG4gICAgICAvLyAgICAgICAvLyBTdGF0dXNcbiAgICAgIC8vICAgICAgIGJyZWFrO1xuICAgICAgLy8gICAgIGNhc2UgMjpcbiAgICAgIC8vICAgICAgIGJyZWFrO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG4gICAgICAvLyBzd2l0Y2ggKHgpIHtcbiAgICAgIC8vICAgY2FzZSAwOlxuICAgICAgLy8gICAgIC8vIEZyZXF1ZW5jeVxuICAgICAgLy8gICAgIGRhdGEuRnJlcXVlbmN5ID0gbnVtYmVyRmlsdGVyO1xuICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgLy8gICBjYXNlIDE6XG4gICAgICAvLyAgICAgLy8gT2Zmc2V0XG4gICAgICAvLyAgICAgZGF0YS5EdXBsZXggPSBudW1iZXJGaWx0ZXIgPCAwID8gJy0nIDogJysnO1xuICAgICAgLy8gICAgIGRhdGEuT2Zmc2V0ID0gTWF0aC5hYnMobnVtYmVyRmlsdGVyKTtcbiAgICAgIC8vICAgICBicmVhaztcbiAgICAgIC8vICAgY2FzZSAyOlxuICAgICAgLy8gICAgIC8vIFRvbmVcbiAgICAgIC8vICAgICBjb25zdCBpc0RUU0MgPSAvRFxcZCsvO1xuICAgICAgLy8gICAgIGlmIChpc0RUU0MudGVzdCh0ZXh0KSkge1xuICAgICAgLy8gICAgICAgZGF0YS5Ub25lID0gJ0RUU0MnXG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgLy8gICBjYXNlIDM6XG4gICAgICAvLyAgICAgLy8gQ2FsbFxuICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgLy8gICBjYXNlIDQ6XG4gICAgICAvLyAgICAgLy8gTG9jYXRpb25cbiAgICAgIC8vICAgICBicmVhaztcbiAgICAgIC8vICAgY2FzZSA1OlxuICAgICAgLy8gICAgIC8vIFNUL1BSXG4gICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAvLyAgIGNhc2UgNjpcbiAgICAgIC8vICAgICAvLyBVc2VcbiAgICAgIC8vICAgICBicmVhaztcbiAgICAgIC8vICAgY2FzZSA3OlxuICAgICAgLy8gICAgIC8vIFZPSVBcbiAgICAgIC8vICAgICBicmVhaztcbiAgICAgIC8vICAgY2FzZSA4OlxuICAgICAgLy8gICAgIC8vIE1pXG4gICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAvLyAgIGNhc2UgOTpcbiAgICAgIC8vICAgICAvLyBTdGF0dXNcbiAgICAgIC8vICAgICBicmVhaztcbiAgICAgIC8vIH1cbiAgICB9KTtcbiAgICBhbGxEYXRhLnB1c2goZGF0YSk7XG4gIH0pO1xufSk7XG4vLyBhbGxEYXRhLnNvcnQoKGEsIGIpID0+IGEuRnJlcXVlbmN5IC0gYi5GcmVxdWVuY3kpO1xuLy8gYWxsRGF0YS5mb3JFYWNoKChhLCBpKSA9PiBhLkxvY2F0aW9uID0gaSk7XG5KU09OLnN0cmluZ2lmeShhbGxEYXRhKTtcbiJdfQ==