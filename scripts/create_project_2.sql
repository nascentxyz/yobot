INSERT INTO projects
  (
  id,
  created_at,
  title,
  website,
  description,
  launch_time,
  image_src,
  token_address
  )
VALUES(
    1,
    CURRENT_TIMESTAMP,
    'Strict Mint',
    'https://goerli.etherscan.io/address/0xed198777a685a7152ecf165b4a4dee010fe6f933',
    'ERC721 with strict minting requirements',
    '2022-02-02T12:34:56.790',
    '/etherscan.png',
    '0xed198777a685a7152ecf165b4a4dee010fe6f933'
);