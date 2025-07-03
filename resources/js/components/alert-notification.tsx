import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, AlertCircleIcon, CheckCircle2, CheckCircle2Icon, X } from "lucide-react"
import { useEffect, useState } from "react"

type AlertType = "success" | "error" | "warning" | "info"

interface AlertNotificationProps {
  type: AlertType
  title: string
  message: string
  duration?: number
  onClose?: () => void
}

export function AlertNotification({
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: AlertNotificationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  const alertConfig = {
    success: {
      icon: <CheckCircle2Icon className="h-4 w-4" />,
      variant: "default" as const,
    },
    error: {
      icon: <AlertCircleIcon className="h-4 w-4" />,
      variant: "destructive" as const,
    },
    warning: {
      icon: <AlertCircle className="h-4 w-4" />,
      variant: "default" as const,
    },
    info: {
      icon: <AlertCircle className="h-4 w-4" />,
      variant: "default" as const,
    },
  }

  return (


    <div className={`fixed top-4 right-4 z-50 w-full max-w-sm ${visible ? 'alert-slide-in' : 'alert-fade-out'}`}>
        <Alert variant={alertConfig[type].variant}>
            {alertConfig[type].icon}
        <div className="flex justify-between items-start gap-3">

        <div>
            <AlertTitle className="">{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </div>
        {/* <button
            onClick={() => {
                setVisible(false)
                onClose?.()
            }}
            className="text-muted-foreground hover:text-foreground"
        >
            <X className="h-4 w-4" />
        </button> */}
    </div>
        </Alert>
    </div>
  )
}
