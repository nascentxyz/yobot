**What is Yobot?**
Yobot is a completely trustless marketplace. You can place bids, where your eth is escrowed by Yobot contracts until either:

1. A bot comes along and mints your NFT, sending it to your address and receiving the escrowed funds from the Yobot Contracts.
2. You cancel your order either before the minting, or after (in case you were outbid and no bot was able to fill your order).

**Why Yobot?**
Yobot makes minting nfts via bots accessible to all NFT buyers, so you have the best chance at securing the art you love!
Place a bid on an NFT project before it drops and bots will compete to mint an NFT for you as soon as they become available at your specified price.
If the drop sells out before your order is filled, you can cancel your bid at any time for a full refund (minus gas)!

**Isn't this just Artbotter.io?**
Yobot is the evolution of [Artbotter](https://artbotter.io). With a lot of attention building up around the project, the Artbotter team graciously passed the project onto us, transforming into Yobot!
Now we are looking to you, our community, to help us build this project out, and shape it's future direction (hosted NFT auctions? smart-batched-auctions :eyes: https://github.com/FrankieIsLost/smart-batched-auctions), etc, etc)

**What is Yobot's Roadmap?**
Yobot will soon:tm: run an experimental market for one drop to flush out any details and get community feedback.

**Why participate in Yobot's Alpha?**
Besides helping us find any bugs and iron out the protocol, we will remember who the original participants of Yobot's Alpha are.
This does _not_ guarantee any financial incentive for participating in the Yobot Alpha, nor advice you to place any amount in the protocol more than you're willing to lose.

**Have the Yobot smart contracts been audited?**
No. The code is open source and anyone is free to check it out here (ArtBlocks version) or here (general ERC721 version). It is straightforward to analyze, but the code has not been audited, and you should not send it more money than you'd be happy losing. If you lose money, there is nothing we can do for you. You won't be reimbursed in any way. We'll be trusting the contract with our own money, but this is alpha software and you should treat it as such.

**How much should I offer to pay?**
That's completely up to you! But here are a few things to keep in mind:

- Bots won't try to fill your order unless your bid covers their costs. Bots have to use more gas than normal users, because they need to mint the NFT _and_ transfer the NFT to you. Bots have to participate in any gas wars that occur during the drop, and bots pay Yobot a 1% fee for our services.
- For hyped, fixed-price drops it is not uncommon to see bids of more than 1 ETH above the minting price. For dutch auction drops, bids of your target minting price + 20% may do fine. Your guess is as good as ours when it comes to predicting what gas prices will be during a drop.

**Yobot won't help you buy the NFTs more cheaply than you could mint them on your own.**
Instead, it will:

- Help you be faster so you are more likely to get an NFT before they sell out. Bots can adjust gas prices and resubmit transactions faster than any user could do manually. Additionally, the Yobot team will run a flashbots-searcher bot (https://github.com/nascentxyz/yobot-searcher), so the transactions will not be frontrun since the transactions are not whispered across the mempool.
- Ensures you don't ever lose money on reverting transactions. So you can bid as high as you would as if you were gas warring by yourself, but without the risk of losing money on reverting transactions.
- Lets you bypass the project's UI. Bots can start minting and filling your orders before a project's UI is updated to start allowing purchases.
- Bypass any per-account mint limits an NFT project may have.

**Can I submit bids for more than one NFT per project?**
Yes. Yobot allows users to place an unlimited number of orders, even if the NFT project has a per-account mint limit (assuming there are many running bots or bots manage many addresses for minting).

**Can I submit bids for multiple projects at once?**
Yes, though Yobot Alpha is limited to a single project - one drop, that is. But soon:tm: you will be able to place bids for as many projects as you want.

**Can my bids be partially filled?**
Yes. For example, suppose you place bids for 10 NFTs offering to pay 1 ETH each, so you've deposited 10 ETH into Yobot. It is possible the bots will only manage to get 7 of the NFTs for you. You could then cancel the remainder of your bid (3 NFTs) and get the remainder of your deposit (3 ETH) back.
In the future, it's possible Yobot can support minting requirements such as only fulfilling all orders or orders with x number of NFTs - shadowy solidity codooors, we need you!

**How do I increase or decrease my bid after placing it?**
To increase or decrease your bid you must first cancel your existing bid, and then place a new bid.

**Are there any fees?**
Bots that fill orders through Yobot pay a fee of 1% to Yobot. Users pay no fees at all.

**Can I specify an individual tokenId that I want?**
Not for Yobot Alpha. When you place a bid for a NFT, you specify a particular project, and your bid can be filled with any NFT from that project. You may end up with "floor price" NFTs or rare NFTs. You never know.
This is subject to change in the future :sneaky_pepe:

**Does Yobot work if the project uses a Dutch auction?**
Yes. Yobot works with any possible initial distribution mechanism, including auctions. The smart contract is completely agnostic to the initial distribution method and any restrictions on them (e.g. limited minting requirements, no-contract purchases, etc). Yobot users never need to worry about any of that. The bots will handle it. You make a large enough offer for some NFTs, and the bots will do whatever it takes to get them for you.

**Can I order an NFT that requires something other than ETH to mint?**
Yes, Yobot can fill orders for NFTs that require something other than ETH to mint. However, when you create an order on Yobot, you must make your offer in ETH.

**How do I get in touch with someone about Yobot?**
Reach out over [discord](https://discord.gg/Kg2ca95cXf) and feel free to shout out to the team with an @team.
