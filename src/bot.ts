import Bot from "./interfaces/IBot";
import { createNode, addOptions } from "./utils/nodeBuilder";

const loadBot = () => {
  let masterNode = createNode("Seja bem vindo(a)!\nO que deseja saber?", "", 0, null, true);

  const nodeHorarioCheck = createNode(
    "Check-In: 12h\nCheck-Out: 14h",
    "Horário de Check-In e Check-Out",
    0
  );

  const nodeTelefoneContato = createNode(
    "(31) 98330-4689",
    "Telefone de atendimento",
    1
  );

  let nodeQuartosDisponíveis = createNode(
    "Nossos quartos disponíveis são:",
    "Quartos disponíveis",
    2
  );
  const quartoA = createNode(
    "Esse é um quarto com 2 camas de casal.",
    "Quarto A",
    0
  );
  const quartoB = createNode(
    "Esse é um quarto com uma cama de casal e duas de solteiro.",
    "Quarto B",
    1
  );
  const quartoC = createNode(
    "Esse é um quarto sem camas. Você dorme no chão :)",
    "Quarto C",
    2
  );
  nodeQuartosDisponíveis = addOptions(
    nodeQuartosDisponíveis,
    quartoA,
    quartoB,
    quartoC
  );

  masterNode = addOptions(
    masterNode,
    nodeHorarioCheck,
    nodeTelefoneContato,
    nodeQuartosDisponíveis
  );

  const builtBot: Bot = { rootNode: masterNode };
  return builtBot;
};

export const Bot: Bot = loadBot();
