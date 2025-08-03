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

  const getTokenIcon = (symbol) => {
    const icons = {
      BTC: "₿",
      SOL: "◎",
      ETH: "Ξ",
    };
    return icons[symbol] || "●";
  };

  const getWalletAddress = (order) => {
    if (!order.createdBy) return null;

    const { tokenSymbol } = order;
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

  const orderResponse = [
    {
      _id: "684ac9e4cdcb72577b2a5493",
      tokenName: "Solana",
      tokenSymbol: "SOL",
      unitPrice: "157.66",
      usdPrice: "2",
      amountToPay: "5000",
      transactionReceipt:
        "https://res.cloudinary.com/dhhiwatii/image/upload/v1749731810/mkugthsq65fhylgisasc.png",
      status: "completed",
      bankName: "Eko Xpedite NG",
      accountName: "Eko Xpedite NG",
      accountNumber: "randomBankValues",
      createdBy: null,
      updatedBy: "681ccd017918fbc4fc7a626d",
      createdAt: 1749731812096,
      updatedAt: 1754000555264,
      id: "3028d18a-5c74-4a16-aa94-09c6b5695083",
      __v: 0,
    },
    {
      _id: "684ac95dcdcb72577b2a548d",
      tokenName: "Bitcoin",
      tokenSymbol: "BTC",
      unitPrice: "106951",
      usdPrice: "20",
      amountToPay: "32000",
      transactionReceipt:
        "https://res.cloudinary.com/dhhiwatii/image/upload/v1749731676/ilhwyavtsruacxcx87du.png",
      status: "completed",
      bankName: "Eko Xpedite NG",
      accountName: "Eko Xpedite NG",
      accountNumber: "randomBankValues",
      createdBy: null,
      updatedBy: "681ccd017918fbc4fc7a626d",
      createdAt: 1749731677643,
      updatedAt: 1753858506710,
      id: "df8d3904-dc09-4761-a113-fac5aa7dee2a",
      __v: 0,
    },
    {
      _id: "6846e107cdcb72577b2a52de",
      tokenName: "Bitcoin",
      tokenSymbol: "BTC",
      unitPrice: "107730",
      usdPrice: "12",
      amountToPay: "20000",
      transactionReceipt:
        "https://res.cloudinary.com/dhhiwatii/image/upload/v1749475587/mtd08asyibxurgxdwhdr.png",
      status: "completed",
      bankName: "Eko Xpedite NG",
      accountName: "Eko Xpedite NG",
      accountNumber: "randomBankValues",
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
        updatedAt: 1752924200953,
        updatedBy: "67bc442c76b6914cd7a2be00",
        transactionPin:
          "$2b$10$9PHRUs2WqgBW7GLdMOGIeO7q9ql91JjVUdF81YprbjDOKkugVQEpO",
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
      updatedBy: "681ccd017918fbc4fc7a626d",
      createdAt: 1749475590990,
      updatedAt: 1753787561420,
      id: "8e045668-b283-4b26-a1f2-2a21b339e361",
      __v: 0,
    },
    {
      _id: "683f3dfecdcb72577b2a51e0",
      tokenName: "Bitcoin",
      tokenSymbol: "BTC",
      unitPrice: "106094",
      usdPrice: "5000",
      amountToPay: "7502000",
      transactionReceipt:
        "https://res.cloudinary.com/dhhiwatii/image/upload/v1748975100/j9plo3u80z3svowah5pr.jpg",
      status: "pending",
      bankName: "Eko Xpedite NG",
      accountName: "Eko Xpedite NG",
      accountNumber: "randomBankValues",
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
        updatedAt: 1750155183548,
        updatedBy: "67cec7604747905732995ae5",
        transactionPin:
          "$2b$10$8lFFsuteqATiguma8Lg49u62Ae4jqx91CkdVU08vvU1XdC5YnPh3S",
        devices: [],
        is2faEnabled: false,
        appleSub: "111730419605210970547",
        username: "Knighttitan",
        currencyRate: "2000",
        gender: "male",
        secret2faCode: "HA7HOTS6M5GFGM2FHEVDAYJ7HFYTSP3G",
      },
      updatedBy: "67cec7604747905732995ae5",
      createdAt: 1748975102676,
      updatedAt: 1748975102677,
      id: "791781f5-d43c-4781-a925-25f6eda44149",
      __v: 0,
    },
    {
      _id: "681800746725160c8992d710",
      tokenName: "Bitcoin",
      tokenSymbol: "BTC",
      unitPrice: "94308",
      usdPrice: "100",
      amountToPay: "152000",
      transactionReceipt:
        "https://res.cloudinary.com/dhhiwatii/image/upload/v1746403443/rscrnpblzvmjf0lxytob.png",
      status: "pending",
      bankName: "Eko Xpedite NG",
      accountName: "Eko Xpedite NG",
      accountNumber: "randomBankValues",
      createdBy: {
        isPhoneVerified: false,
        _id: "67b71a08f1230a7a4ca2a609",
        email: "ekoxpedite@gmail.com",
        __v: 0,
        avatar: null,
        bitcoinAddress: "12MkNrcWEa2a6qicHoWfu6zXD9Yy77siDk",
        bitcoinMnemonic:
          "U2FsdGVkX193vY1JyRzOaa74pxRoXM6PlU3AofEwUKrJWS2jZdM60HNq1vI4FpuxmeU8iUAU1xWN6V5eMFZuHn5pwXN8N8QW5SPBYGgCZdkYZ/QaidRp2uX5bg4GuLQW",
        country: "Nigeria",
        createdAt: 1740053000778,
        createdBy: null,
        ethereumAddress: "0x782A8F38ee5737e54f00c0038EAD6a1061589aff",
        ethereumMnemonic:
          "U2FsdGVkX1/IFx71+uBha00Etv19GFqqh8EaHNjvNrbE/Y2eGwVbsXgTCwygxk3oma/c1RjAtFyO+hJcT5BLmxa/d1RVvtDrIkqbsMLcwmeuzPh9B91AGZXCkjx5WiLGfyXkME7uOaLnu5PVKisDZg==",
        firstname: "Eko",
        id: "6f98f66c-89cf-46f4-85a6-d9b700a0d0e6",
        isActive: true,
        isKYCDone: false,
        isVerified: true,
        lastname: "Xpedite",
        password:
          "$2b$10$agMBCsyImJvw71oCndM3juCNK8EXWh5L6Eihxl1N40MJIov4aIQ9a",
        phone: "+2349093525394",
        solanaAddress: "FrMtKfiG5i5m1F3rpss35HmTF8G49aUnqHZVyyBGQaTd",
        solanaMnemonic:
          "U2FsdGVkX1/3VoPrqrqnUWAIQGPUSE/HrkoHcWchCyU7iVV7JlHOGXRrUx1pWKnLaiHAaAeTY8A7NJHM2UoVYcJhMISmQU1CU5JUPMspg4HR78GHngDwMU15IbGnWKHy",
        status: "Active",
        timezone: "Africa/Lagos",
        tronAddress: "TJkteVX2a1vUSHRKNXtHgbRGo1CGZh79pa",
        updatedAt: 1752271643913,
        updatedBy: "67b71a08f1230a7a4ca2a609",
        transactionPin:
          "$2b$10$AXNSaYSmBz322r6dq.aTOe99A0E9B2k04Rku88L8fMOz2MQ0Q5r2i",
        appleSub: "100714910304409132110",
        username: "uttX",
        gender: "male",
        devices: [
          {
            deviceId: "15c25c07-b517-448f-a20d-b371da67eb35",
            longitude: 3.5591998411112926,
            latitude: 6.439655006157221,
            locationName: "CHQ5+R9P",
            deviceName: "iPhone",
            _id: "67f024971d1a235bdd985e15",
          },
          {
            deviceId: "d2fa2383-bb59-4ee2-a318-7fcc1fc2a290",
            longitude: 0,
            latitude: 0,
            locationName: "Unknown Location",
            deviceName: "iPhone",
            _id: "681a00436725160c8992da9c",
          },
        ],
        is2faEnabled: false,
        secret2faCode: "LNDVE3BQFRFSQWZMEM2FEVLBLZ3XI5DQGZ4FQTJFNBRXCJCEEFKA",
      },
      updatedBy: "67b71a08f1230a7a4ca2a609",
      createdAt: 1746403444723,
      updatedAt: 1746403444725,
      id: "fd3b7262-4e53-4cc2-820c-bf134392ae85",
      __v: 0,
    },
  ];

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
                paginatedOrders.map((order) => (
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
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: "12px",
                              bgcolor: "primary.main",
                              color: "white",
                              border: 1,
                              borderColor: "primary.main",
                            }}
                          >
                            {getTokenIcon(order.tokenSymbol)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {order.tokenName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {order.tokenSymbol}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: "12px",
                              bgcolor: "secondary.main",
                              color: "white",
                              border: 1,
                              borderColor: "secondary.main",
                            }}
                          >
                            {getTokenIcon(order.tokenSymbol)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {order.tokenName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {order.tokenSymbol}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </TableCell>

                    <TableCell>
                      {tab === 0 ? (
                        <>
                          <Typography variant="body2">
                            {formatCurrency(order.unitPrice)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            USD: ${order.usdPrice}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" fontWeight="medium">
                          {formatCurrency(order.amountToPay)}
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
                          <Typography variant="caption" color="text.secondary">
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
                              order.tokenSymbol
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
                ))
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
