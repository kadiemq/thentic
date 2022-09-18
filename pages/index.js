import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [privateKey, setPrivateKey] = useState("");
  const [chainId, setChainId] = useState();
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    (async () => {
      let socket = io();

      socket.on(requestId, (data) => {
        console.log(data);
      });
    })();
  });

  async function submit() {
    const response = await fetch("https://thentic.tech/api/nfts/contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: privateKey,
        chain_id: chainId,
        name: name,
        short_name: shortName,
        webhook_url: "Webhook URL",
      }),
    })
      .then((response) => response.json())
      .catch((e) => console.log(e));

    setRequestId(response.request_id);
    window.open(response.transaction_url);

    console.log(response);
  }

  return (
    <div>
      <input
        name="private key"
        type={"text"}
        value={privateKey}
        onChange={(e) => {
          setPrivateKey(e.target.value);
        }}
      />
      <input
        name="chain id"
        type={"text"}
        value={chainId}
        onChange={(e) => {
          setChainId(e.target.value);
        }}
      />
      <input
        name="name"
        type={"text"}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        name="short name"
        type={"text"}
        value={shortName}
        onChange={(e) => {
          setShortName(e.target.value);
        }}
      />

      <button onClick={() => submit()}>Submit</button>
    </div>
  );
}
