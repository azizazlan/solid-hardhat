import { createSignal, createRenderEffect, Show, onCleanup } from "solid-js";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@suid/material";
import ArrowDropUpIcon from "@suid/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@suid/icons-material/ArrowDropDown";
import { ethers, Wallet } from "ethers";

import counterJson from "./assets/artifacts/contracts/Counter.sol/Counter.json";

const COUNTER_ADDR = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";
const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export default function Counter() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const metaMaskWallet = new Wallet(PRIVATE_KEY, provider);
  const counter = new ethers.Contract(COUNTER_ADDR, counterJson.abi, provider);
  const [count, setCount] = createSignal(0);
  const [loading, setLoading] = createSignal(false);

  const initialize = async () => {
    setLoading(true);
    const count = await counter._count();
    setCount(Number(count));
    setLoading(false);
  };

  createRenderEffect(() => {
    initialize();
  });

  const handleIncrease = async () => {
    setLoading(true);
    const tx = await counter.connect(metaMaskWallet).increase();
    await tx.wait();
    const count = await counter._count();
    setCount(Number(count));
    setLoading(false);
  };

  const handleDecrease = async () => {
    setLoading(true);
    const tx = await counter.connect(metaMaskWallet).decrease();
    await tx.wait();
    const count = await counter._count();
    setCount(Number(count));
    setLoading(false);
  };

  onCleanup(() => setLoading(false));

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography variant="h4">Count</Typography>
          <Typography variant="body2">
            Interact with the smart contract
          </Typography>
          <Show when={!loading()}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {count()}
            </Typography>
          </Show>
          <Show when={loading()}>
            <CircularProgress color="secondary" />
          </Show>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        disabled={loading()}
        startIcon={ArrowDropUpIcon}
        onClick={handleIncrease}
      >
        increase
      </Button>
      <Button
        variant="outlined"
        startIcon={ArrowDropDownIcon}
        sx={{ marginTop: 1 }}
        onClick={handleDecrease}
        disabled={loading()}
      >
        decrease
      </Button>
    </Box>
  );
}
