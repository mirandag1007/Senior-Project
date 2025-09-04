export interface Note {
  id: string
  title: string
  course: string
  created_at: string
  file_key: string
  dateISO: string    // for display
  preview: string  // storage path for the .md file
}

export type RequestStatus = 'unfulfilled' | 'accepted' | 'completed'

export interface ConnectRequest {
  id: string
  course: string
  dateISO: string
  time: string
  priceType: 'free' | 'paid'
  amount?: number
  details: string
  status: RequestStatus
  requesterId: string
}
