import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { TON_NET } from "../const/CONST";

export function useTonClient() {
    return useAsyncInitialize(
        async() => 
            new TonClient({
                endpoint: await getHttpEndpoint({network: TON_NET.ton_use_net})
            })
    );
}