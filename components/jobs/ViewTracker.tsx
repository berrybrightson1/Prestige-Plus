'use client'

import { useEffect, useRef } from 'react'
import { incrementJobView } from '@/app/actions/analytics'

export function ViewTracker({ jobId }: { jobId: string }) {
    const hasTracked = useRef(false)

    useEffect(() => {
        if (!hasTracked.current) {
            incrementJobView(jobId)
            hasTracked.current = true
        }
    }, [jobId])

    return null
}
