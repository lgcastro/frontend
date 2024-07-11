import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGestsModal } from './invite-gests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestStep } from './steps/invite-gest-step'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGestsInputOpen, setIsGestsInputOpen] = useState(false)
  const [isGestsModalOpen, setIsGestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br',
    'john@acme.com'
  ])

  function openGestsInput() {
    setIsGestsInputOpen(true)
  }

  function closeGestsInput() {
    setIsGestsInputOpen(false)
  }

  function openGestsModal() {
    setIsGestsModalOpen(true)
  }

  function closeGestsModal() {
    setIsGestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <DestinationAndDateStep
              isGestsInputOpen={isGestsInputOpen}
              closeGestsInput={closeGestsInput}
              openGestsInput={openGestsInput}
          />

          {isGestsInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGestsModal={openGestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isGestsModalOpen && (
        <InviteGestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGestsModal={closeGestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
      
    </div>
  )
}
