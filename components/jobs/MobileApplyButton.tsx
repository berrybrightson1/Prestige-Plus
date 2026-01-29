'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { ApplicationForm } from './ApplicationForm'

interface MobileApplyButtonProps {
    jobId: string
    jobTitle: string
}

export function MobileApplyButton({ jobId, jobTitle }: MobileApplyButtonProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Inline Button for Mobile Layout */}
            <div className="lg:hidden mb-6">
                <Button
                    variant="primary"
                    className="w-full shadow-lg h-14 text-lg"
                    onClick={() => setIsOpen(true)}
                >
                    Apply for this Role
                </Button>
            </div>

            {/* Application Modal with slide-up animation */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={`Apply for ${jobTitle}`}
                variant="bottom"
            >
                <div className="max-h-[80vh] overflow-y-auto pr-2 pb-4">
                    <ApplicationForm jobId={jobId} jobTitle={jobTitle} isModal={true} />
                </div>
            </Modal>
        </>
    )
}
