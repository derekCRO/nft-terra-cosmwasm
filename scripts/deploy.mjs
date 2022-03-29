import { readFileSync } from "fs";

import {
  LCDClient,
  MnemonicKey,
  MsgInstantiateContract,
  MsgStoreCode,
} from "@terra-money/terra.js";


const CONTRACT_PATH =
  "target/wasm32-unknown-unknown/release/cw721_fixed_price.wasm";

// Get the wallet seed phrase from the environment variable.
const TERRA_SEED = process.env.TERRA_SEED

const mk = new MnemonicKey({
  mnemonic:
    TERRA_SEED,
});

const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12',
  gasPrices: { uluna: 0.15},
});

const wallet = terra.wallet(mk);

run();


async function run() {
  console.log("Deploying Contract");

  const contractCodeId = await upload(CONTRACT_PATH);
}


async function upload(contractPath) {
  const wasm = readFileSync(contractPath);
  const tx = new MsgStoreCode(mk.accAddress, wasm.toString("base64"));
  try {
    const storeResult = await wallet
      .createAndSignTx({
        msgs: [tx],
        memo: `Storing ${contractPath}`,
      })
      .then((tx) => terra.tx.broadcast(tx));

    console.log(storeResult.raw_log);

    const codeId = extractCodeId(storeResult.raw_log);
    return codeId;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default {};