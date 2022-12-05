import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  createTheme,
  ThemeProvider, Stack
} from "@mui/material";
import {AppTheme} from "../lib/theme";
import {MyContractContext} from "../lib/MyContractContext";
import {Web3Context} from "../lib/Web3Context";

const Home = (props) => {
  const [contractInstance, setContractInstance] = useState(null);
  const [charityName, setCharityName] = useState("");
  const [charityAmount, setCharityAmount] = useState("10000");
  const [account, setAccount] = useState();

  const CharityFactory = useContext(MyContractContext);
  const web3Context = useContext(Web3Context);

   // eslint-disable-next-line
  const initConfig = useCallback(() => {
    web3Context.eth.requestAccounts((error, coinbaseAddress) => {
      if (error) {
        setAccount(null);
        return console.error(error);
      }
      if (coinbaseAddress !== account){
        setAccount(coinbaseAddress);
      }
    });
  }, [account, web3Context.eth]);

  useEffect(() => {
    setTimeout(() => {
      initConfig();
    }, 500);
  },)


  const handleAction = async () => {
    // Do some actions here...
    await contractInstance.createCharity(charityName, charityAmount, {
      from: account[0]
    });
  };

  useEffect(() => {
    CharityFactory
      ?.deployed()
      ?.then(async function(instance) {
        // Do something with instance...
        setContractInstance(instance);
      })
      ?.catch(e => {
        // Failed to load web3, accounts, or contract. Check console for details.
        // console.error(e);
      });
  },[]); //[] means load useeffect only once

  return (
    <ThemeProvider theme={createTheme(AppTheme)}>
      <Box sx={{ p: 2, pt: 10, flexGrow: 1, display: "flex", flexDirection: "column", gap:3 }}>
        <TextField id="outlined-basic" label="Charity Name" variant="outlined" fullWidth value={charityName} onChange={(e) => setCharityName(e.target.value)} />
        <TextField id="outlined-basic" label="Charity Target" variant="outlined" fullWidth value={charityAmount} onChange={(e) => setCharityAmount(e.target.value)} />
      
        <Button variant="contained" onClick={handleAction}>Create Charity</Button>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
