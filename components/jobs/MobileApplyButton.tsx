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
            {/* Sticky Bottom Container */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-cream-200 z-40">
                <Button
                    variant="primary"
                    className="w-full shadow-lg h-14 text-lg"
                    onClick={() => setIsOpen(true)}
                >
                    Apply for this Role
                </Button>
            </div>

            {/* Application Modal */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={`Apply for ${jobTitle}`}
            >
                <div className="max-h-[80vh] overflow-y-auto">
                    <ApplicationForm jobId={jobId} jobTitle={jobTitle} isModal={true} />
                </div>
            </Modal>
        </>
    )
}
