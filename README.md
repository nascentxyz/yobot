# <h1 align="center"> Yobot </h1>

<p align="center">A trustless broker to match Flashbots searchers with user bids.</p>

<div align="center">

![Lints](https://github.com/nascentxyz/yobot/workflows/Linting/badge.svg)
![Tests](https://github.com/nascentxyz/yobot/workflows/Tests/badge.svg)

</div>

## Development

Install dependencies with `yarn`

To run the development server:

```
yarn dev
# or
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying src/pages/index.js. The page auto-updates as you edit the file.

## Deploying

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/nascentxyz/yobot&project-name=yobot&repository-name=yobot)

# Contracts

### Getting Started

```sh
make
make test
```

### Generating Contract Visuals

We use [surya](https://github.com/ConsenSys/surya) to create contract diagrams.

Run `yarn visualize` to generate an amalgamated contract visualization in the `out/` directory. Or use the below commands for each respective contract.

##### YobotArtBlocksBroker.sol

Run `surya graph -s src/YobotArtBlocksBroker.sol | dot -Tpng > out/YobotArtBlocksBroker.png`

##### YobotERC721LimitOrder.sol

Run `surya graph -s src/YobotERC721LimitOrder.sol | dot -Tpng > out/YobotERC721LimitOrder.png`

## Deploying

Contracts can be deployed via the `make deploy` command. Addresses are automatically
written in a name-address json file stored under `out/addresses.json`.

We recommend testing your deployments and provide an example under [`scripts/test-deploy.sh`](./scripts/test-deploy.sh)
which will launch a local testnet, deploy the contracts, and do some sanity checks.

Environment variables under the `.env` file are automatically loaded (see [`.env.example`](./.env.example)).
Be careful of the [precedence in which env vars are read](https://github.com/dapphub/dapptools/tree/2cf441052489625f8635bc69eb4842f0124f08e4/src/dapp#precedence).

We assume `ETH_FROM` is an address you own and is part of your keystore.
If not, use `ethsign import` to import your private key.

See the [`Makefile`](./Makefile#25) for more context on how this works under the hood

We use Alchemy as a remote node provider for the Mainnet & Rinkeby network deployments.
You must have set your API key as the `ALCHEMY_API_KEY` enviroment variable in order to
deploy to these networks

### Mainnet

Original [ArtBlocksBroker](https://etherscan.io/address/0xE52A2A7B8dACe2ff8cdC64EabB605821A393474D#code): `0xE52A2A7B8dACe2ff8cdC64EabB605821A393474D`

Original [ERC721LimitOrder](https://etherscan.io/address/0x56E6FA0e461f92644c6aB8446EA1613F4D72a756#code): `0x56E6FA0e461f92644c6aB8446EA1613F4D72a756`

```
ETH_FROM=0xc0248cD71633C8a412301915912eF10e75e7D260 make deploy-mainnet
```

### Rinkeby


First, if `seth` is not configured, we should run an `ethsign import --keystore <desired_keystore_file_location>`.
Then follow the steps to import your wallet private key and set a signing passphrase.

Then, we must source our environment variables to deploy to the Rinkeby network:

```sh
ETH_FROM=xxxx
ETH_RPC_URL=xxxx
# 15M is block limit
ETH_GAS=xxxx
```

The ArtBlocks Factory is deployed on mainnet at [0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270](https://etherscan.io/address/0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270#code), but we need to have it deployed on Rinkeby.

To deploy `GenArt721Core` as was deployed to `` on [Rinkeby](), run the following command in the [base directory](./):

```
dapp create GenArt721Core --verify
```

**YobotERC721LimitOrder** deployed and verified on rinkeby at [0x8b5842a935731ed1b92e3211a7f38bebd185eb53](https://rinkeby.etherscan.io/address/0x8b5842a935731ed1b92e3211a7f38bebd185eb53#code)

Command used to deploy:

```
ETH_GAS=15000000 dapp create src/YobotERC721LimitOrder.sol:YobotERC721LimitOrder --verify 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```

Command used to verify:

```
ETH_GAS=15000000 dapp verify-contract src/YobotERC721LimitOrder.sol:YobotERC721LimitOrder 0x8b5842a935731ed1b92e3211a7f38bebd185eb53 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```

**YobotArtBlocksBroker** Deployed and verified on rinkeby at: [0x1b78c74b301aa66c3da90556be7290eb2dcc2864](https://rinkeby.etherscan.io/address/0x1b78c74b301aa66c3da90556be7290eb2dcc2864#code)

Command used to deploy:

```
ETH_GAS=15000000 dapp create src/YobotArtBlocksBroker.sol:YobotArtBlocksBroker --verify 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```

Command to verify:

```
ETH_GAS=15000000 dapp verify-contract src/YobotArtBlocksBroker.sol:YobotArtBlocksBroker 0x1b78c74b301aa66c3da90556be7290eb2dcc2864 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```


### Goerli

First, if `seth` is not configured, we should run an `ethsign import --keystore <desired_keystore_file_location>`.
Then follow the steps to import your wallet private key and set a signing passphrase.

Then, we must source our environment variables to deploy to the Goerli network:

```
ETH_FROM=xxxx
ETH_RPC_URL=xxxx
ETH_GAS=xxxx
```

The ArtBlocks Factory is deployed on mainnet at [0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270](https://etherscan.io/address/0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270#code), but we need to have it deployed on goerli.

To deploy `GenArt721Core` as was deployed to `` on [Goerli](), run the following command in the [base directory](./):

```
dapp create GenArt721Core --verify
```

**YobotERC721LimitOrder** deployed and verified on goerli at [0x0d29790c2412f42248905f879260f1a6f409a11a](https://goerli.etherscan.io/address/0x0d29790c2412f42248905f879260f1a6f409a11a#code)

Command used to deploy:

```
ETH_GAS=15000000 dapp create src/YobotERC721LimitOrder.sol:YobotERC721LimitOrder --verify 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```

Command used to verify:

```
ETH_GAS=15000000 dapp verify-contract src/YobotERC721LimitOrder.sol:YobotERC721LimitOrder 0x0d29790c2412f42248905f879260f1a6f409a11a 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```

**YobotArtBlocksBroker** Deployed and verified on goerli at: [0x041761ca2d7730ae3788f732c1a43db002feff2f](https://goerli.etherscan.io/address/0x041761ca2d7730ae3788f732c1a43db002feff2f#code)

Command used to deploy:

```
ETH_GAS=15000000 dapp create src/YobotArtBlocksBroker.sol:YobotArtBlocksBroker 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```

Command to verify:

```
ETH_GAS=15000000 dapp verify-contract src/YobotArtBlocksBroker.sol:YobotArtBlocksBroker 0x041761ca2d7730ae3788f732c1a43db002feff2f 0xf25e32C0f2928F198912A4F21008aF146Af8A05a 5
```

## License

[AGPL-3.0-only](https://github.com/nascentxyz/yobot/blob/master/LICENSE)

# Credits

- [Artbotter]() for their tremendous initial lift and inspiration!
- [Georgios Konstantopoulos](https://github.com/gakonst) for the amazing [dapptools-template](https://github.com/gakonst/dapptools-template) resource.
- ds-test, OZ, Chainlink for inherited libraries
- [Rari dApp](https://github.com/Rari-Capital/rari-dApp/tree/master/src)
- [Jacobe Dawson](https://github.com/jacobedawson)'s [Connect Metamask React dApp Tutorial](https://dev.to/jacobedawson/build-a-web3-dapp-in-react-login-with-metamask-4chp).

## Noted Issues

On initial library import, `zeppelin-solidity` root contract directory will need to be changed from "contracts" to "src". Use the commands:

```
ln -s contracts lib/zeppelin-solidity/src
echo /src >>.git/modules/lib/zeppelin-solidity/info/exclude
```

## Disclaimer

_These smart contracts are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts. They have not been audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions, loss of transmitted information or loss of funds. Nascent is not liable for any of the foregoing. Users should proceed with caution and use at their own risk._
