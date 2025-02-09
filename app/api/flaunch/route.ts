import { ethers } from 'ethers';
import { abi } from '@/utils/abi';

export async function POST(req: Request) {
    console.log('Request received');
    try {
        const body = await req.json();
        console.log('Request body:', body);
        const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
        const contractAddress = '0x9A7059cA00dA92843906Cb4bCa1D005cE848AFdC';
        const privateKey = process.env.PRIVATE_KEY || '0x';
        const wallet = new ethers.Wallet(privateKey, provider);


        if (!wallet || !privateKey) {
            throw new Error('Private key not found');
        }

        const signer = wallet;

        const positionManager = new ethers.Contract(contractAddress, abi, signer);
        const now = Math.floor(Date.now() / 1000);

        const initialPriceParams = ethers.AbiCoder.defaultAbiCoder().encode(['uint'], [75000e6]); // example: $75,000 market cap

        const flaunchParams = {
            name: 'MyToken',
            symbol: 'MTK',
            tokenUri: 'ipfs://QmScdsMTXWm3GUvzUwvQvYJLBQjtXwFjWvLgGvPBgipHmg',
            initialTokenFairLaunch: ethers.parseUnits("10000000000000000000000000000", 0),
            premineAmount: ethers.parseUnits('0', 0),
            creator: '0x9054E37Eac6D11791caF5b3a4fd9ec4Bc1B4dfD8',
            creatorFeeAllocation: 2000,
            flaunchAt: now,
            initialPriceParams: initialPriceParams,
            feeCalculatorParams: '0x'
        };

        // Calculate flaunch fee. For simplicity, we assume the fee calculation is done off-chain.
        // In a production scenario, you need to compute the fee by calling PositionManager.getFlaunchingFee
        // and, if required, any premine fee calculation. Here we assume a fee value of 0.001 ETH as an example.
        const flaunchFee = ethers.parseEther('0.001');

        const tx = await positionManager.flaunch(flaunchParams, { value: flaunchFee, gasLimit: 5000000 });
        console.log('Transaction sent, waiting for confirmation...');
        const receipt = await tx.wait();
        console.log('Transaction confirmed:', receipt);

        return new Response(
            JSON.stringify({
                success: true,
                hash: tx.hash,
                receipt: receipt
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error details:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error
            }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}