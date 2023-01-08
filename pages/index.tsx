import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Home: NextPage = () => {
  const [fetcchId, setFetcchId] = useState("");

  const requestFunds = async () => {
    const toastId = toast.loading("Requesting funds")

    if (fetcchId) {
      try {
        const res = await fetch("https://api.fetcch.xyz/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `mutation PaymentRequest($request: RequestCreateInput!) {
    paymentRequests(request: $request) {
        id
			  payer {
			    id
			  }
			  payee {
			    id
			   }
			  token
			  chain {
					id
					name
					chainId
				}
			  amount
			  message
			  label
			  data
			  executed
			  transactionHash
			  sameChain
			  fromChain {
					id
					name
					chainId
				}
			  fromToken
			  dstTransactionHash
			  createdAt
    }
}`,
            variables: {
              request: {
                payee: "jj@fetcch",
                payer: fetcchId,
                token: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                chain: "2",
                amount: "2000000000",
                message: `Payment for product`,
                label: `${new Date().toLocaleString()}`,
              },
            },
          }),
          headers: {
            "content-type": "application/json",
            "secret-key": "c77bb51e-de42-45eb-8992-046df6007da5",
          },
        });

        toast.success("Successfully requested payment", {
          id: toastId,
        });
      } catch (e) {
        toast.error("Something wrong with request", {
          id: toastId
        })
      }
    } else {
      toast.error("Please enter a valid fetcch Id", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Fetcch
          </a>
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Product Name &rarr;</h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
              alt=""
            />
            <h3 className="text-lg font-bold">Price - 2000 USDC</h3>
            <input
              value={fetcchId}
              onChange={(e) => setFetcchId(e.target.value)}
              placeholder="Fetcch ID"
              className="rounded-md border p-2 mt-3 w-full"
              type="text"
              name=""
              id=""
            />
            <div onClick={() => requestFunds()} className="cursor-pointer w-full p-2 bg-blue-600 rounded-md text-white mt-3 text-center">
              Buy
            </div>
          </div>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
