"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caps_service_1 = require("./services/caps.service");
const key_service_1 = require("./services/key.service");
const number_service_1 = require("./services/number.service");
const output_service_1 = require("./services/output.service");
const string_service_1 = require("./services/string.service");
const keys = new key_service_1.default();
const outputs = new output_service_1.default();
outputs.use(keys);
const caps = new caps_service_1.default();
caps.use(keys);
outputs.use(caps);
const numbers = new number_service_1.default();
const strings = new string_service_1.default();
numbers.use(keys);
strings.use(numbers);
outputs.use(strings);
const map = new Map();
