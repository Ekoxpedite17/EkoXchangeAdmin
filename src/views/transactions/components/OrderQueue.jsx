import React, { useState } from "react";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  Typography,
  Chip,
  TablePagination,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import ContentCopy from "@mui/icons-material/ContentCopy";

const OrderQueue = ({ buyOrders, sellOrders, onOrderClick, tab, setTab }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = tab === 0 ? buyOrders : sellOrders;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getWalletAddress = (order) => {
    if (!order.createdBy) return null;

    const tokenSymbol = order?.selectedToken?.chain?.nativeToken;
    const user = order.createdBy;

    switch (tokenSymbol?.toUpperCase()) {
      case "BTC":
        return user.bitcoinAddress;
      case "ETH":
        return user.ethereumAddress;
      case "SOL":
        return user.solanaAddress;
      case "TRX":
        return user.tronAddress;
      default:
        return null;
    }
  };

  const getWalletAddressLabel = (tokenSymbol) => {
    switch (tokenSymbol?.toUpperCase()) {
      case "BTC":
        return "Bitcoin Address";
      case "ETH":
        return "Ethereum Address";
      case "SOL":
        return "Solana Address";
      case "TRX":
        return "Tron Address";
      default:
        return "Wallet Address";
    }
  };

  const SellResponseObject = [
    {
      _id: "68d284b6b71fd728af7f7069",
      unitPrice: "218.42",
      usdPrice: "0.001",
      txnHash:
        "UmaVkQV6vq8iGiMPti1qm7p7ocH9qQ2Z98XrLvVhMTRmNf2jJ56b2LL4rPcwnEtAMDggw3q49rVAABpqpBRaxxg",
      chain: "Solana",
      amountToPay: "0.001005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "AJOSE, SAMSON IFEOLUWA",
      accountNumber: "2015139744",
      selectedToken: {
        _id: "68c55c82af691313b565c0de",
        symbol: "SOL",
        chain: {
          _id: "68c55a7baf691313b565c0da",
          name: "Solana",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://explorer.solana.com",
          id: "9fbc8dac-54c3-41be-9ca6-5ddeb08e7dac",
          isActive: true,
          nativeToken: "SOL",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        __v: 0,
        contractAddress: null,
        createdAt: 1758100899491,
        createdBy: null,
        decimals: 9,
        enableBuy: true,
        enableSell: true,
        id: "edfb4a73-6a7e-4231-8900-bcc963503b9e",
        isActive: true,
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Solana",
        tokenType: "Native",
        updatedAt: 1758100899491,
        updatedBy: null,
      },
      createdBy: {
        _id: "67bc442c76b6914cd7a2be00",
        email: "ajoseifeoluwa7@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1EvMj46FKuqYUR6zA3VADhwctYNpe69RiM",
        bitcoinMnemonic:
          "U2FsdGVkX1+L/WVV/YqbCb6u8v/8T8qGP02Ew9XufoZLtjTZ/o6CKINyXh2y43i9FkuuOKdgzgGO1bw/VL/B6pRZ0PZ/XaUN7+1kaqXWeca7s95Wrtc+k6B7vGMkRKmU",
        country: "Nigeria",
        createdAt: 1740391468025,
        createdBy: null,
        ethereumAddress: "0x0FdF3a9C7b64Fd9836f342D18aFA4e0eAb117B3A",
        ethereumMnemonic:
          "U2FsdGVkX19EkLdwHqEnLm97RzhIsAZN1awZLsM/ginISsBu4zHxX8gHiaZK3MMBumPA8P5RreaKaXCSPbXi6MBNYSS93fjMRRhtdxzc9ion3+uk5XEh/pTlgAGOVOW1yMXC/fhU3j0ZpFXxuORo4Q==",
        firstname: "Ife",
        id: "42572f72-c67d-44c8-9119-12afa1fd7926",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Ajose",
        password:
          "$2b$10$B0yZA8.zbenFAEV1xHDl4.SIsMi6D/q8/vAEuz8MhK.7ydtr4wPoC",
        phone: "+2348494034934",
        solanaAddress: "9qYCZ81hyve28GASN2xumndyuLdrj4UYKbGZZvyfnrrW",
        solanaMnemonic:
          "U2FsdGVkX18edZArefBs/wRI56hEB31CgECuHv82yK+arXfedF5vs9VRQQFHl2jYPKfoBmkPBpVjyxthI34v0Hd3G/8k9X3y4Zc7+mFbEU/YY2mLBYQ2SLq9TYGxavMB",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TCCFpgM6NqH61SutnbcwCstxJ4HXFs9VVQ",
        updatedAt: 1756550922565,
        updatedBy: "67bc442c76b6914cd7a2be00",
        transactionPin:
          "$2b$10$e5Y.xV/JgiJFN0FuaBwPduFo5trJ7lkHdGWBrkEPP8.hYuv1zlC2a",
        username: "Pindy",
        gender: "male",
        devices: [
          {
            deviceId: "43430020-f999-49be-aceb-14340e089e69",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "sdk_gphone64_arm64",
            _id: "6806224f3a42da06d1ec6496",
          },
          {
            deviceId: "835a4f17-08d1-4646-b200-15cc401a926a",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "iPhone",
            _id: "68508001cdcb72577b2a563a",
          },
        ],
        is2faEnabled: false,
        secret2faCode: "MVZEWTLVHFQT4URWJN3UM6KPPUXTE6DZIZHXWSZXFBOWQXRKOJFQ",
        appleSub: "105632950902419352636",
      },
      updatedBy: "67bc442c76b6914cd7a2be00",
      createdAt: 1758626998131,
      updatedAt: 1758626998132,
      id: "0564a40d-2158-4035-b70d-ef5e077b9325",
      __v: 0,
    },
    {
      _id: "68d27f9bb71fd728af7f6e86",
      unitPrice: "218.85",
      usdPrice: "0.01",
      txnHash:
        "37g8xMoE8tMZ63n7VApDQAUaiTiTbT3whgcTcwLjXnMyDiuYTGBo1TcnLXtTVjtrKCKVJSqgwGty2Ptb92iUicEm",
      chain: "Solana",
      amountToPay: "0.010005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "AJOSE, SAMSON IFEOLUWA",
      accountNumber: "2015139744",
      selectedToken: {
        _id: "68c55c82af691313b565c0de",
        symbol: "SOL",
        chain: {
          _id: "68c55a7baf691313b565c0da",
          name: "Solana",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://explorer.solana.com",
          id: "9fbc8dac-54c3-41be-9ca6-5ddeb08e7dac",
          isActive: true,
          nativeToken: "SOL",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        __v: 0,
        contractAddress: null,
        createdAt: 1758100899491,
        createdBy: null,
        decimals: 9,
        enableBuy: true,
        enableSell: true,
        id: "edfb4a73-6a7e-4231-8900-bcc963503b9e",
        isActive: true,
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Solana",
        tokenType: "Native",
        updatedAt: 1758100899491,
        updatedBy: null,
      },
      createdBy: {
        _id: "67cec7604747905732995ae5",
        email: "seyi.oyebamiji@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1PvutepLPSajwiMPT8QMsXBxBsxHj6VFYm",
        bitcoinMnemonic:
          "U2FsdGVkX19FnTgt8mpjRMkRywMBtlK2u88OzTv4ekSZp0JGKmCJaIyY5DGKxHxmRQ0jlcZbuVPcisuBIAcl+uSnK3MNKPiWPi/D5E/DEaVtCsGYrV5RZg3msCqD/ssd",
        country: "Nigeria",
        createdAt: 1741604704783,
        createdBy: null,
        ethereumAddress: "0x462e419CC45A67F9E25AEc0FD5696572C9015A6e",
        ethereumMnemonic:
          "U2FsdGVkX19TDwi+FNGGHelT43kwDyg71yHcLc60uduItjDBNJv7btnL8m5w95UCQTscKGT9qepK2UvPsnc6s/T2jWf86JIkbo6Qcos+79ioXU93cwI22ylBH9nLHRxaBpWHU5VpioqLrz7pmvn2Wg==",
        firstname: "Sennin",
        id: "4435263d-b861-4463-8d09-a907fe3f51ef",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Seyi",
        password:
          "$2b$10$PUtjPlbr4G4MdmHFDxSOnuWdGpA0AwdPtnhaaEk5E0T5WQRlmWouS",
        phone: "+2348104187670",
        solanaAddress: "6Agr45tciQXeq2aRRVyLpchwajrTYbdeXoXsBCfb4xR4",
        solanaMnemonic:
          "U2FsdGVkX19zF1c836ujvV6BPJqqpEh52HqgEKOLfCnrJBsONoTJ5cDCCz3xZbjrcEtCao4wsWT2Bmna7ZwNvg1sS3azFw6XEztLGuhTqLQTrWvg6n5foEKwqeOcdc4W/wB9IrDebvQdrQQpN85jzQ==",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TMCtLJrRwu5Xm27i7RP8nhAchD1N62Qc2c",
        updatedAt: 1758194826531,
        updatedBy: "67cec7604747905732995ae5",
        transactionPin:
          "$2b$10$jZr4qZVkqln8CM0KpWHBLOWFFxk1vZX8xB2Wootf59HtcTBKbP2du",
        devices: [],
        is2faEnabled: false,
        appleSub: "111730419605210970547",
        username: "Knighttitan",
        currencyRate: "2000",
        gender: "male",
        secret2faCode: "OAXVMPREKBVT4I2TONZFITS5LM2C45T3NZISQ2DJKQZSUOSKNBBA",
      },
      updatedBy: "67cec7604747905732995ae5",
      createdAt: 1758625691251,
      updatedAt: 1758625691252,
      id: "3e6b73f8-0422-403a-a310-fd23f6b2409a",
      __v: 0,
    },
    {
      _id: "68d258fbb71fd728af7f6d49",
      unitPrice: "0.340222",
      usdPrice: "0.005",
      txnHash:
        "2c79828976b79e8ee03568cfe58fc0b02bcb2dd133db41cfac4a32a90655f8df",
      chain: "Tron",
      amountToPay: "0.005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "AJOSE, SAMSON IFEOLUWA",
      accountNumber: "2015139744",
      selectedToken: {
        _id: "68c55c83af691313b565c0e0",
        chain: {
          _id: "68c55a7baf691313b565c0db",
          name: "Tron",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://tronscan.org",
          id: "6f61a8b9-8353-4bac-9907-f108a55700cd",
          isActive: true,
          nativeToken: "TRX",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        symbol: "USDT",
        __v: 0,
        contractAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        createdAt: 1758100899803,
        createdBy: null,
        decimals: 6,
        enableBuy: true,
        enableSell: true,
        id: "d7d58ae1-8803-4d2c-9f0f-a295bb51fa16",
        isActive: true,
        logo: "https://zengo.com/wp-content/uploads/USDT-TRC20.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Tether USD",
        tokenType: "TRC20",
        updatedAt: 1758100899803,
        updatedBy: null,
      },
      createdBy: {
        _id: "67bc442c76b6914cd7a2be00",
        email: "ajoseifeoluwa7@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1EvMj46FKuqYUR6zA3VADhwctYNpe69RiM",
        bitcoinMnemonic:
          "U2FsdGVkX1+L/WVV/YqbCb6u8v/8T8qGP02Ew9XufoZLtjTZ/o6CKINyXh2y43i9FkuuOKdgzgGO1bw/VL/B6pRZ0PZ/XaUN7+1kaqXWeca7s95Wrtc+k6B7vGMkRKmU",
        country: "Nigeria",
        createdAt: 1740391468025,
        createdBy: null,
        ethereumAddress: "0x0FdF3a9C7b64Fd9836f342D18aFA4e0eAb117B3A",
        ethereumMnemonic:
          "U2FsdGVkX19EkLdwHqEnLm97RzhIsAZN1awZLsM/ginISsBu4zHxX8gHiaZK3MMBumPA8P5RreaKaXCSPbXi6MBNYSS93fjMRRhtdxzc9ion3+uk5XEh/pTlgAGOVOW1yMXC/fhU3j0ZpFXxuORo4Q==",
        firstname: "Ife",
        id: "42572f72-c67d-44c8-9119-12afa1fd7926",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Ajose",
        password:
          "$2b$10$B0yZA8.zbenFAEV1xHDl4.SIsMi6D/q8/vAEuz8MhK.7ydtr4wPoC",
        phone: "+2348494034934",
        solanaAddress: "9qYCZ81hyve28GASN2xumndyuLdrj4UYKbGZZvyfnrrW",
        solanaMnemonic:
          "U2FsdGVkX18edZArefBs/wRI56hEB31CgECuHv82yK+arXfedF5vs9VRQQFHl2jYPKfoBmkPBpVjyxthI34v0Hd3G/8k9X3y4Zc7+mFbEU/YY2mLBYQ2SLq9TYGxavMB",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TCCFpgM6NqH61SutnbcwCstxJ4HXFs9VVQ",
        updatedAt: 1756550922565,
        updatedBy: "67bc442c76b6914cd7a2be00",
        transactionPin:
          "$2b$10$e5Y.xV/JgiJFN0FuaBwPduFo5trJ7lkHdGWBrkEPP8.hYuv1zlC2a",
        username: "Pindy",
        gender: "male",
        devices: [
          {
            deviceId: "43430020-f999-49be-aceb-14340e089e69",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "sdk_gphone64_arm64",
            _id: "6806224f3a42da06d1ec6496",
          },
          {
            deviceId: "835a4f17-08d1-4646-b200-15cc401a926a",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "iPhone",
            _id: "68508001cdcb72577b2a563a",
          },
        ],
        is2faEnabled: false,
        secret2faCode: "MVZEWTLVHFQT4URWJN3UM6KPPUXTE6DZIZHXWSZXFBOWQXRKOJFQ",
        appleSub: "105632950902419352636",
      },
      updatedBy: "67bc442c76b6914cd7a2be00",
      createdAt: 1758615803110,
      updatedAt: 1758615803110,
      id: "fdf188a9-6b71-4bbc-bcfe-779bf3170c44",
      __v: 0,
    },
    {
      _id: "68d2580db71fd728af7f6d36",
      unitPrice: "219.1",
      usdPrice: "0.005",
      txnHash:
        "LK4GXAfQQUsMgyKRDPN9aUqHsQkDrkQjCNgzAG9Jw8J3JjQFP5KwZyPPCpMtEqcRoWsG86i87DuLBJfn4hsuWsc",
      chain: "Solana",
      amountToPay: "0.005005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "AJOSE, SAMSON IFEOLUWA",
      accountNumber: "2015139744",
      selectedToken: {
        _id: "68c55c82af691313b565c0de",
        symbol: "SOL",
        chain: {
          _id: "68c55a7baf691313b565c0da",
          name: "Solana",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://explorer.solana.com",
          id: "9fbc8dac-54c3-41be-9ca6-5ddeb08e7dac",
          isActive: true,
          nativeToken: "SOL",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        __v: 0,
        contractAddress: null,
        createdAt: 1758100899491,
        createdBy: null,
        decimals: 9,
        enableBuy: true,
        enableSell: true,
        id: "edfb4a73-6a7e-4231-8900-bcc963503b9e",
        isActive: true,
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Solana",
        tokenType: "Native",
        updatedAt: 1758100899491,
        updatedBy: null,
      },
      createdBy: {
        _id: "67bc442c76b6914cd7a2be00",
        email: "ajoseifeoluwa7@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1EvMj46FKuqYUR6zA3VADhwctYNpe69RiM",
        bitcoinMnemonic:
          "U2FsdGVkX1+L/WVV/YqbCb6u8v/8T8qGP02Ew9XufoZLtjTZ/o6CKINyXh2y43i9FkuuOKdgzgGO1bw/VL/B6pRZ0PZ/XaUN7+1kaqXWeca7s95Wrtc+k6B7vGMkRKmU",
        country: "Nigeria",
        createdAt: 1740391468025,
        createdBy: null,
        ethereumAddress: "0x0FdF3a9C7b64Fd9836f342D18aFA4e0eAb117B3A",
        ethereumMnemonic:
          "U2FsdGVkX19EkLdwHqEnLm97RzhIsAZN1awZLsM/ginISsBu4zHxX8gHiaZK3MMBumPA8P5RreaKaXCSPbXi6MBNYSS93fjMRRhtdxzc9ion3+uk5XEh/pTlgAGOVOW1yMXC/fhU3j0ZpFXxuORo4Q==",
        firstname: "Ife",
        id: "42572f72-c67d-44c8-9119-12afa1fd7926",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Ajose",
        password:
          "$2b$10$B0yZA8.zbenFAEV1xHDl4.SIsMi6D/q8/vAEuz8MhK.7ydtr4wPoC",
        phone: "+2348494034934",
        solanaAddress: "9qYCZ81hyve28GASN2xumndyuLdrj4UYKbGZZvyfnrrW",
        solanaMnemonic:
          "U2FsdGVkX18edZArefBs/wRI56hEB31CgECuHv82yK+arXfedF5vs9VRQQFHl2jYPKfoBmkPBpVjyxthI34v0Hd3G/8k9X3y4Zc7+mFbEU/YY2mLBYQ2SLq9TYGxavMB",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TCCFpgM6NqH61SutnbcwCstxJ4HXFs9VVQ",
        updatedAt: 1756550922565,
        updatedBy: "67bc442c76b6914cd7a2be00",
        transactionPin:
          "$2b$10$e5Y.xV/JgiJFN0FuaBwPduFo5trJ7lkHdGWBrkEPP8.hYuv1zlC2a",
        username: "Pindy",
        gender: "male",
        devices: [
          {
            deviceId: "43430020-f999-49be-aceb-14340e089e69",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "sdk_gphone64_arm64",
            _id: "6806224f3a42da06d1ec6496",
          },
          {
            deviceId: "835a4f17-08d1-4646-b200-15cc401a926a",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "iPhone",
            _id: "68508001cdcb72577b2a563a",
          },
        ],
        is2faEnabled: false,
        secret2faCode: "MVZEWTLVHFQT4URWJN3UM6KPPUXTE6DZIZHXWSZXFBOWQXRKOJFQ",
        appleSub: "105632950902419352636",
      },
      updatedBy: "67bc442c76b6914cd7a2be00",
      createdAt: 1758615565442,
      updatedAt: 1758615565442,
      id: "a452aca4-8dbd-44f0-ac2d-5a57d7e6b0bf",
      __v: 0,
    },
    {
      _id: "68d23806b71fd728af7f67ba",
      unitPrice: "215.83",
      usdPrice: "0.001",
      txnHash:
        "5V3NxqgzgZhiCzezz6U83EiHCoQpx4sP5nXyCUTZPkWrKpSjNEKG1cW4DpYGubAxPHwvLHKkzh58rFuHvh5nUs5A",
      chain: "Solana",
      amountToPay: "0.001005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "AJOSE, SAMSON IFEOLUWA",
      accountNumber: "2015139744",
      selectedToken: {
        _id: "68c55c82af691313b565c0de",
        symbol: "SOL",
        chain: {
          _id: "68c55a7baf691313b565c0da",
          name: "Solana",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://explorer.solana.com",
          id: "9fbc8dac-54c3-41be-9ca6-5ddeb08e7dac",
          isActive: true,
          nativeToken: "SOL",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        __v: 0,
        contractAddress: null,
        createdAt: 1758100899491,
        createdBy: null,
        decimals: 9,
        enableBuy: true,
        enableSell: true,
        id: "edfb4a73-6a7e-4231-8900-bcc963503b9e",
        isActive: true,
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Solana",
        tokenType: "Native",
        updatedAt: 1758100899491,
        updatedBy: null,
      },
      createdBy: {
        _id: "67cec7604747905732995ae5",
        email: "seyi.oyebamiji@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1PvutepLPSajwiMPT8QMsXBxBsxHj6VFYm",
        bitcoinMnemonic:
          "U2FsdGVkX19FnTgt8mpjRMkRywMBtlK2u88OzTv4ekSZp0JGKmCJaIyY5DGKxHxmRQ0jlcZbuVPcisuBIAcl+uSnK3MNKPiWPi/D5E/DEaVtCsGYrV5RZg3msCqD/ssd",
        country: "Nigeria",
        createdAt: 1741604704783,
        createdBy: null,
        ethereumAddress: "0x462e419CC45A67F9E25AEc0FD5696572C9015A6e",
        ethereumMnemonic:
          "U2FsdGVkX19TDwi+FNGGHelT43kwDyg71yHcLc60uduItjDBNJv7btnL8m5w95UCQTscKGT9qepK2UvPsnc6s/T2jWf86JIkbo6Qcos+79ioXU93cwI22ylBH9nLHRxaBpWHU5VpioqLrz7pmvn2Wg==",
        firstname: "Sennin",
        id: "4435263d-b861-4463-8d09-a907fe3f51ef",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Seyi",
        password:
          "$2b$10$PUtjPlbr4G4MdmHFDxSOnuWdGpA0AwdPtnhaaEk5E0T5WQRlmWouS",
        phone: "+2348104187670",
        solanaAddress: "6Agr45tciQXeq2aRRVyLpchwajrTYbdeXoXsBCfb4xR4",
        solanaMnemonic:
          "U2FsdGVkX19zF1c836ujvV6BPJqqpEh52HqgEKOLfCnrJBsONoTJ5cDCCz3xZbjrcEtCao4wsWT2Bmna7ZwNvg1sS3azFw6XEztLGuhTqLQTrWvg6n5foEKwqeOcdc4W/wB9IrDebvQdrQQpN85jzQ==",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TMCtLJrRwu5Xm27i7RP8nhAchD1N62Qc2c",
        updatedAt: 1758194826531,
        updatedBy: "67cec7604747905732995ae5",
        transactionPin:
          "$2b$10$jZr4qZVkqln8CM0KpWHBLOWFFxk1vZX8xB2Wootf59HtcTBKbP2du",
        devices: [],
        is2faEnabled: false,
        appleSub: "111730419605210970547",
        username: "Knighttitan",
        currencyRate: "2000",
        gender: "male",
        secret2faCode: "OAXVMPREKBVT4I2TONZFITS5LM2C45T3NZISQ2DJKQZSUOSKNBBA",
      },
      updatedBy: "67cec7604747905732995ae5",
      createdAt: 1758607366112,
      updatedAt: 1758607366112,
      id: "a9d03d2c-7a7a-4657-8bf6-14ee250dcd39",
      __v: 0,
    },
    {
      _id: "68d22cdc7d47c26a53ae6754",
      unitPrice: "215.93",
      usdPrice: "0.001",
      txnHash:
        "3m2rVgQZvnE2fvkeA47TuFQStA6QVSUcpHSNYC7KvtZn3dJyH9Euesze96e6H3BUV8TX4dLaBBzNGmC4PZYwRtiN",
      chain: "Solana",
      amountToPay: "0.001005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "AJOSE, SAMSON IFEOLUWA",
      accountNumber: "2015139744",
      selectedToken: {
        _id: "68c55c82af691313b565c0de",
        symbol: "SOL",
        chain: {
          _id: "68c55a7baf691313b565c0da",
          name: "Solana",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://explorer.solana.com",
          id: "9fbc8dac-54c3-41be-9ca6-5ddeb08e7dac",
          isActive: true,
          nativeToken: "SOL",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        __v: 0,
        contractAddress: null,
        createdAt: 1758100899491,
        createdBy: null,
        decimals: 9,
        enableBuy: true,
        enableSell: true,
        id: "edfb4a73-6a7e-4231-8900-bcc963503b9e",
        isActive: true,
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Solana",
        tokenType: "Native",
        updatedAt: 1758100899491,
        updatedBy: null,
      },
      createdBy: {
        _id: "67cec7604747905732995ae5",
        email: "seyi.oyebamiji@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1PvutepLPSajwiMPT8QMsXBxBsxHj6VFYm",
        bitcoinMnemonic:
          "U2FsdGVkX19FnTgt8mpjRMkRywMBtlK2u88OzTv4ekSZp0JGKmCJaIyY5DGKxHxmRQ0jlcZbuVPcisuBIAcl+uSnK3MNKPiWPi/D5E/DEaVtCsGYrV5RZg3msCqD/ssd",
        country: "Nigeria",
        createdAt: 1741604704783,
        createdBy: null,
        ethereumAddress: "0x462e419CC45A67F9E25AEc0FD5696572C9015A6e",
        ethereumMnemonic:
          "U2FsdGVkX19TDwi+FNGGHelT43kwDyg71yHcLc60uduItjDBNJv7btnL8m5w95UCQTscKGT9qepK2UvPsnc6s/T2jWf86JIkbo6Qcos+79ioXU93cwI22ylBH9nLHRxaBpWHU5VpioqLrz7pmvn2Wg==",
        firstname: "Sennin",
        id: "4435263d-b861-4463-8d09-a907fe3f51ef",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Seyi",
        password:
          "$2b$10$PUtjPlbr4G4MdmHFDxSOnuWdGpA0AwdPtnhaaEk5E0T5WQRlmWouS",
        phone: "+2348104187670",
        solanaAddress: "6Agr45tciQXeq2aRRVyLpchwajrTYbdeXoXsBCfb4xR4",
        solanaMnemonic:
          "U2FsdGVkX19zF1c836ujvV6BPJqqpEh52HqgEKOLfCnrJBsONoTJ5cDCCz3xZbjrcEtCao4wsWT2Bmna7ZwNvg1sS3azFw6XEztLGuhTqLQTrWvg6n5foEKwqeOcdc4W/wB9IrDebvQdrQQpN85jzQ==",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TMCtLJrRwu5Xm27i7RP8nhAchD1N62Qc2c",
        updatedAt: 1758194826531,
        updatedBy: "67cec7604747905732995ae5",
        transactionPin:
          "$2b$10$jZr4qZVkqln8CM0KpWHBLOWFFxk1vZX8xB2Wootf59HtcTBKbP2du",
        devices: [],
        is2faEnabled: false,
        appleSub: "111730419605210970547",
        username: "Knighttitan",
        currencyRate: "2000",
        gender: "male",
        secret2faCode: "OAXVMPREKBVT4I2TONZFITS5LM2C45T3NZISQ2DJKQZSUOSKNBBA",
      },
      updatedBy: "67cec7604747905732995ae5",
      createdAt: 1758604508498,
      updatedAt: 1758604508499,
      id: "00b18c25-ef7a-4ce0-9804-04b60b7af7ef",
      __v: 0,
    },
    {
      _id: "68ceb0e649d3538cb3b3fe7f",
      unitPrice: "238.04",
      usdPrice: "0.01",
      txnHash:
        "2kNSVhFgpYPCBF47CzEec54EstBURnLeCCoGUeMETMTA6yiYi6MarnMSTf6tmnFWj5p48jokTMubxtyR7axJ3Bxj",
      chain: "Solana",
      amountToPay: "0.010005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "AJOSE, SAMSON IFEOLUWA",
      accountNumber: "2015139744",
      selectedToken: {
        _id: "68c55c82af691313b565c0de",
        symbol: "SOL",
        chain: {
          _id: "68c55a7baf691313b565c0da",
          name: "Solana",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://explorer.solana.com",
          id: "9fbc8dac-54c3-41be-9ca6-5ddeb08e7dac",
          isActive: true,
          nativeToken: "SOL",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        __v: 0,
        contractAddress: null,
        createdAt: 1758100899491,
        createdBy: null,
        decimals: 9,
        enableBuy: true,
        enableSell: true,
        id: "edfb4a73-6a7e-4231-8900-bcc963503b9e",
        isActive: true,
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Solana",
        tokenType: "Native",
        updatedAt: 1758100899491,
        updatedBy: null,
      },
      createdBy: {
        _id: "67cec7604747905732995ae5",
        email: "seyi.oyebamiji@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1PvutepLPSajwiMPT8QMsXBxBsxHj6VFYm",
        bitcoinMnemonic:
          "U2FsdGVkX19FnTgt8mpjRMkRywMBtlK2u88OzTv4ekSZp0JGKmCJaIyY5DGKxHxmRQ0jlcZbuVPcisuBIAcl+uSnK3MNKPiWPi/D5E/DEaVtCsGYrV5RZg3msCqD/ssd",
        country: "Nigeria",
        createdAt: 1741604704783,
        createdBy: null,
        ethereumAddress: "0x462e419CC45A67F9E25AEc0FD5696572C9015A6e",
        ethereumMnemonic:
          "U2FsdGVkX19TDwi+FNGGHelT43kwDyg71yHcLc60uduItjDBNJv7btnL8m5w95UCQTscKGT9qepK2UvPsnc6s/T2jWf86JIkbo6Qcos+79ioXU93cwI22ylBH9nLHRxaBpWHU5VpioqLrz7pmvn2Wg==",
        firstname: "Sennin",
        id: "4435263d-b861-4463-8d09-a907fe3f51ef",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Seyi",
        password:
          "$2b$10$PUtjPlbr4G4MdmHFDxSOnuWdGpA0AwdPtnhaaEk5E0T5WQRlmWouS",
        phone: "+2348104187670",
        solanaAddress: "6Agr45tciQXeq2aRRVyLpchwajrTYbdeXoXsBCfb4xR4",
        solanaMnemonic:
          "U2FsdGVkX19zF1c836ujvV6BPJqqpEh52HqgEKOLfCnrJBsONoTJ5cDCCz3xZbjrcEtCao4wsWT2Bmna7ZwNvg1sS3azFw6XEztLGuhTqLQTrWvg6n5foEKwqeOcdc4W/wB9IrDebvQdrQQpN85jzQ==",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TMCtLJrRwu5Xm27i7RP8nhAchD1N62Qc2c",
        updatedAt: 1758194826531,
        updatedBy: "67cec7604747905732995ae5",
        transactionPin:
          "$2b$10$jZr4qZVkqln8CM0KpWHBLOWFFxk1vZX8xB2Wootf59HtcTBKbP2du",
        devices: [],
        is2faEnabled: false,
        appleSub: "111730419605210970547",
        username: "Knighttitan",
        currencyRate: "2000",
        gender: "male",
        secret2faCode: "OAXVMPREKBVT4I2TONZFITS5LM2C45T3NZISQ2DJKQZSUOSKNBBA",
      },
      updatedBy: "67cec7604747905732995ae5",
      createdAt: 1758376166072,
      updatedAt: 1758376166072,
      id: "131451a4-02d2-410d-984d-0d6165741c1a",
      __v: 0,
    },
    {
      _id: "68ce91a849d3538cb3b3fdd7",
      unitPrice: "237.59",
      usdPrice: "0.001",
      txnHash:
        "292ScunHthgCZ4GDf7tLCbJkDmjrS8kvF278zWJqLwpBfQmorRvQnAkHwj6RmJTjGRz5sUN5HteecEEHu1HCxMz9",
      chain: "Solana",
      amountToPay: "0.001005",
      status: "pending",
      bankName: "Kuda Bank",
      accountName: "Uthman Alade Junaid",
      accountNumber: "2027735044",
      selectedToken: {
        _id: "68c55c82af691313b565c0de",
        symbol: "SOL",
        chain: {
          _id: "68c55a7baf691313b565c0da",
          name: "Solana",
          __v: 0,
          createdAt: 1758100898398,
          createdBy: null,
          explorerUrl: "https://explorer.solana.com",
          id: "9fbc8dac-54c3-41be-9ca6-5ddeb08e7dac",
          isActive: true,
          nativeToken: "SOL",
          updatedAt: 1758100898398,
          updatedBy: null,
        },
        __v: 0,
        contractAddress: null,
        createdAt: 1758100899491,
        createdBy: null,
        decimals: 9,
        enableBuy: true,
        enableSell: true,
        id: "edfb4a73-6a7e-4231-8900-bcc963503b9e",
        isActive: true,
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        maximumTransaction: 6000,
        minimumTransaction: 2000,
        name: "Solana",
        tokenType: "Native",
        updatedAt: 1758100899491,
        updatedBy: null,
      },
      createdBy: {
        _id: "67bc442c76b6914cd7a2be00",
        email: "ajoseifeoluwa7@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "1EvMj46FKuqYUR6zA3VADhwctYNpe69RiM",
        bitcoinMnemonic:
          "U2FsdGVkX1+L/WVV/YqbCb6u8v/8T8qGP02Ew9XufoZLtjTZ/o6CKINyXh2y43i9FkuuOKdgzgGO1bw/VL/B6pRZ0PZ/XaUN7+1kaqXWeca7s95Wrtc+k6B7vGMkRKmU",
        country: "Nigeria",
        createdAt: 1740391468025,
        createdBy: null,
        ethereumAddress: "0x0FdF3a9C7b64Fd9836f342D18aFA4e0eAb117B3A",
        ethereumMnemonic:
          "U2FsdGVkX19EkLdwHqEnLm97RzhIsAZN1awZLsM/ginISsBu4zHxX8gHiaZK3MMBumPA8P5RreaKaXCSPbXi6MBNYSS93fjMRRhtdxzc9ion3+uk5XEh/pTlgAGOVOW1yMXC/fhU3j0ZpFXxuORo4Q==",
        firstname: "Ife",
        id: "42572f72-c67d-44c8-9119-12afa1fd7926",
        isActive: true,
        isKYCDone: false,
        isPhoneVerified: false,
        isVerified: true,
        lastname: "Ajose",
        password:
          "$2b$10$B0yZA8.zbenFAEV1xHDl4.SIsMi6D/q8/vAEuz8MhK.7ydtr4wPoC",
        phone: "+2348494034934",
        solanaAddress: "9qYCZ81hyve28GASN2xumndyuLdrj4UYKbGZZvyfnrrW",
        solanaMnemonic:
          "U2FsdGVkX18edZArefBs/wRI56hEB31CgECuHv82yK+arXfedF5vs9VRQQFHl2jYPKfoBmkPBpVjyxthI34v0Hd3G/8k9X3y4Zc7+mFbEU/YY2mLBYQ2SLq9TYGxavMB",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TCCFpgM6NqH61SutnbcwCstxJ4HXFs9VVQ",
        updatedAt: 1756550922565,
        updatedBy: "67bc442c76b6914cd7a2be00",
        transactionPin:
          "$2b$10$e5Y.xV/JgiJFN0FuaBwPduFo5trJ7lkHdGWBrkEPP8.hYuv1zlC2a",
        username: "Pindy",
        gender: "male",
        devices: [
          {
            deviceId: "43430020-f999-49be-aceb-14340e089e69",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "sdk_gphone64_arm64",
            _id: "6806224f3a42da06d1ec6496",
          },
          {
            deviceId: "835a4f17-08d1-4646-b200-15cc401a926a",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "iPhone",
            _id: "68508001cdcb72577b2a563a",
          },
        ],
        is2faEnabled: false,
        secret2faCode: "MVZEWTLVHFQT4URWJN3UM6KPPUXTE6DZIZHXWSZXFBOWQXRKOJFQ",
        appleSub: "105632950902419352636",
      },
      updatedBy: "67bc442c76b6914cd7a2be00",
      createdAt: 1758368168363,
      updatedAt: 1758368168363,
      id: "9536f0e2-7d1d-48be-8316-ea9fffc979b7",
      __v: 0,
    },
  ];

  const getNairaAmount = (order) => {
    const unitPrice = parseFloat(order.unitPrice || 0);
    const sellingPrice = parseFloat(order?.usdPrice || 0);
    return sellingPrice * unitPrice;
  };

  return (
    <Card sx={{ background: "white", borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Buy" />
          <Tab label="Sell" />
        </Tabs>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>{tab === 0 ? "Token" : "Asset Sold"}</TableCell>
                {tab === 1 && <TableCell>Dollar Price (USD)</TableCell>}
                <TableCell>
                  {tab === 0 ? "Amount" : "Naira Amount to be Paid"}
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>
                  {tab === 0 ? "Status" : "User Bank Details"}
                </TableCell>
                <TableCell>{tab === 0 && "Wallet Address"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => {
                  return (
                    <TableRow
                      key={order.id || order._id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => onOrderClick(order)}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {order.id || order._id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {tab === 0 ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box gap={10}>
                              <Typography
                                variant="button"
                                fontSize={10}
                                fontWeight="medium"
                              >
                                {order.selectedToken?.symbol}
                              </Typography>
                              <Typography fontWeight={"600"}>
                                {order.selectedToken?.name}
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              src={order.selectedToken?.logo}
                              sx={{ width: 24, height: 24 }}
                            />
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {order.selectedToken?.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {order.selectedToken?.symbol}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </TableCell>

                      {tab === 1 && (
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            ${order.usdPrice}
                          </Typography>
                        </TableCell>
                      )}

                      <TableCell>
                        {tab === 0 ? (
                          <>
                            <Typography variant="body2">
                              {formatCurrency(order.unitPrice)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              USD: ${order.usdPrice}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="body2" fontWeight="medium">
                            {formatCurrency(getNairaAmount(order))}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {order?.createdBy?.firstname &&
                            order?.createdBy?.lastname
                              ? `${order.createdBy.firstname} ${order.createdBy.lastname}`
                              : order?.createdBy?.firstname ||
                                order?.createdBy?.lastname ||
                                "--"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order?.createdBy?.email || "--"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        {tab === 0 ? (
                          <Chip
                            label={order.status}
                            size="small"
                            color={
                              order.status === "pending"
                                ? "warning"
                                : order.status === "completed"
                                  ? "success"
                                  : "default"
                            }
                          />
                        ) : (
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {order.bankName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {order.accountName}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                              sx={{ fontFamily: "monospace" }}
                            >
                              {order.accountNumber}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>

                      <TableCell>
                        {tab === 0 ? (
                          <Box>
                            {(() => {
                              const walletAddress = getWalletAddress(order);
                              const addressLabel = getWalletAddressLabel(
                                order?.selectedToken?.chain?.nativeToken
                              );

                              if (!walletAddress) {
                                return (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    No wallet address
                                  </Typography>
                                );
                              }

                              return (
                                <>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    {addressLabel}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontFamily: "monospace",
                                      fontSize: "0.75rem",
                                      wordBreak: "break-all",
                                      maxWidth: "200px",
                                    }}
                                  >
                                    {walletAddress}
                                  </Typography>
                                  <Tooltip title="Copy address">
                                    <ContentCopy
                                      fontSize="small"
                                      sx={{
                                        cursor: "pointer",
                                        color: "text.secondary",
                                        mt: 0.5,
                                        "&:hover": {
                                          color: "primary.main",
                                        },
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(
                                          walletAddress
                                        );
                                      }}
                                    />
                                  </Tooltip>
                                </>
                              );
                            })()}
                          </Box>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
        />
      </CardContent>
    </Card>
  );
};

export default OrderQueue;
