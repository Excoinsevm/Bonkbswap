import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export const getBasicAccounts = () => {
  const poolWsol = new PublicKey(process.env.NEXT_PUBLIC_POOL_WSOL || "");
  const poolBonkb = new PublicKey(process.env.NEXT_PUBLIC_POOL_BONKB || "");
  const poolOwner = new PublicKey(process.env.NEXT_PUBLIC_POOL_OWNER || "");
  const bonkbswapAccount = new PublicKey(process.env.NEXT_PUBLIC_BONKBSWAP_ACCOUNT || "");
  const bonkbMint = new PublicKey(process.env.NEXT_PUBLIC_BONKB_MINT || "");

  return {
    poolBonkb, poolWsol, poolOwner, bonkbswapAccount, bonkbMint
  }
}

export const accountExists = async (
  provider: anchor.Provider,
  account: PublicKey,
  programId: PublicKey = TOKEN_PROGRAM_ID
): Promise<boolean> => {
  const info = await provider.connection.getAccountInfo(account);
  if(info === null || !info.owner.equals(programId)){
    return false;
  }else{
    return true;
  }
}

export const getATA = async (
  user: PublicKey,
  mintAccount: PublicKey
): Promise<PublicKey> => {
  const tokenAccount = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mintAccount,
    user
  );
  return tokenAccount;
}

export const createATA = async (
  user: PublicKey,
  mintAccount: PublicKey
): Promise<anchor.web3.Transaction> => {
  const tx = new anchor.web3.Transaction();
  const tokenAccount = await getATA(user, mintAccount);

  tx.add(
    Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mintAccount,
      tokenAccount,
      user,
      user
    )
  );
  return tx;
}
