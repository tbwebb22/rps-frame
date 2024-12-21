// npm i @neynar/nodejs-sdk
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import { CastParamType } from "@neynar/nodejs-sdk/build/api";

const client = () => {
    const config = new Configuration({
        apiKey: process.env.NEYNAR_API_KEY,
    });
    
    return new NeynarAPIClient(config);
}

export const likedAndRecasted = async (castHash: string, fid: number) => {
    const cast = await client().lookupCastByHashOrWarpcastUrl({
        identifier: castHash,
        type: CastParamType.Hash,
        viewerFid: fid
    });
    // console.log(cast);
    // console.log(cast.cast.viewer_context.liked);
    const liked = cast.cast.viewer_context.liked;
    const recasted = cast.cast.viewer_context.recasted;

    console.log(`${fid} liked: ${liked}, recasted: ${recasted}, cast: ${castHash}`);

    return liked && recasted;
};
