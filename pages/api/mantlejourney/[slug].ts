// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    miles?: {
        lendle: string
        total: string
    }
    nfts?: string[]
    error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        return res.status(200).json({})
    }

    try {
        const { slug } = req.query

        const milesRes = await fetch(`https://mdi-quests-api-production.up.railway.app/api/thirdparty/user/${slug}`)
        const milesData = await milesRes.json()

        let response: Data = {}

        if (milesData?.miles) {
            response = { ...milesData }
        }

        res.status(200).json(response)
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}
