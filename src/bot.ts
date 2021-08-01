import Bot from "./interfaces/IBot";
import { buildNode } from "./utils/jsonNodeBuilder";
import fs from "fs";
const mock = require("./mocks/test.json");

const loadBot = () => {
  const createdNode = buildNode(mock);
  const builtBot: Bot = { rootNode: createdNode };
  return builtBot;
};

export const Bot: Bot = loadBot();
