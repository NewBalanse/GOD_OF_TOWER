import { useEffect, useState } from "react";
import Counter from "../contracts/counter";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { useTonConnect } from "./useTonConnect";
import { WalletContractV4 } from "@ton/ton";
export function useCounterContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | string>();
    const {sender} = useTonConnect();

    const sleep = (time: number) => {
        return new Promise(
            (resolve) => {
                setTimeout(resolve, time);
            }
        )
    }

    const counterContract = useAsyncInitialize(
        async () => {
            if(!client) return;

            const clientMasterchainIfo = await client.getMasterchainInfo();
            const clientData = await client.getShardTransactions(
                clientMasterchainIfo.workchain,
                clientMasterchainIfo.initSeqno,
                clientMasterchainIfo.shard
            ).then(result => {
                const contract = new Counter(
                    Address.parse(result[0].account.toString()) // use wallet contract
                );
    
                return client.open(contract) as OpenedContract<Counter>;
            });
            
        }, [client]
    );

    useEffect(() => {
        async function getValue() {
            if (!counterContract) return;

            setVal(null);
            const val = await counterContract.getCounter();
            setVal(val.toString());
            await sleep(5000);
            getValue();
        }
        getValue();
    }, [counterContract]);

    return {
        value: val,
        address: counterContract?.address.toString(),
        sendIncrement: () => {
            return counterContract?.sendIncrement(sender);
        }
    };
}