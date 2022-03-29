# Install rustup and make sure you have the wasm32 target
rustup default stable
rustup update stable
rustup target add wasm32-unknown-unknown

# Install go
sudo rm -rf /usr/local/go && tar -C /usr/local -xzf go1.18.linux-amd64.tar.gz
## Set PATH environment variable
export PATH=$PATH:/usr/local/go/bin

# wasmd
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout v0.23.0
make install

# Compile
RUSTFLAGS='-C link-arg=-s' cargo wasm (Optimizing release size)

# Unit test
RUST_BACKTRACE=1 cargo unit-test

# Create a wallet for local test
wasmd keys add wallet

name: wallet
type: local
address: wasm1rx3l27xahef8jj7yxyg0cc76xks70keyzlrjlp
pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AvexnqEwfeJHAifBP41UKwV7kfYyCDL0xeOOR/JB2P3J"}'
mnemonic: "swift famous admit all stereo orange coconut consider verify better wait runway design issue casual tool hand fatigue slice present divide cabbage glance olive"

# Install modules
npm install @terra-money/terra.js

# Run deploy
node ./scripts/deploy.mjs