# <h1 align="center"> YOBOT </h1>

A trustless broker to match flashbots searchers with user bids.

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

## References

- [Rari dApp](https://github.com/Rari-Capital/rari-dApp/tree/master/src)
- [Jacobe Dawson](https://github.com/jacobedawson)'s [Connect Metamask React dApp Tutorial](https://dev.to/jacobedawson/build-a-web3-dapp-in-react-login-with-metamask-4chp).

## Deploying

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/nascentxyz/yobot&project-name=yobot&repository-name=yobot)

# Contracts

### Getting Started

```sh
git clone https://github.com/Rari-Capital/charity-vaults.git
cd charity-vaults
make
make test
```

### Generating Contract Visuals

We use [surya](https://github.com/ConsenSys/surya) to create contract diagrams.

Run `yarn visualize` to generate an amalgamated contract visualization in the `out/` directory. Or use the below commands for each respective contract.

##### YobotArtBlocksBroker.sol

Run `surya graph -s src/YobotArtBlocksBroker.sol | dot -Tpng > out/YobotArtBlocksBroker.png`

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

```
ETH_FROM=0xc0248cD71633C8a412301915912eF10e75e7D260 make deploy-mainnet
```

### Rinkeby

```
ETH_FROM=0xc0248cD71633C8a412301915912eF10e75e7D260 make deploy-rinkeby
```

### Goerli

## License

[AGPL-3.0-only](https://github.com/nascentxyz/yobot/blob/master/LICENSE)

## Credits

- [t11s](https://twitter.com/transmissions11), [Jet Jadeja](https://twitter.com/JetJadeja), and [David Lucid](https://twitter.com/davidlucid) for the exceptional guidance.
- [Georgios Konstantopoulos](https://github.com/gakonst) for the amazing [dapptools-template](https://github.com/gakonst/dapptools-template) resource.

# Credits

- [Artbotter]() for their tremendous initial lift and inspiration!
- [Georgios Konstantopoulos](https://github.com/gakonst) for the amazing [dapptools-template](https://github.com/gakonst/dapptools-template) resource.
- ds-test, OZ, Chainlink for inherited libraries

## Disclaimer

_These smart contracts are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts. They have not been audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions, loss of transmitted information or loss of funds. Nascent is not liable for any of the foregoing. Users should proceed with caution and use at their own risk._
