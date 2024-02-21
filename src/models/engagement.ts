export interface Engagement {
    _id: number
    data: DataEngagement
}

export interface DataEngagement{
    image_url: string
    username: string
    course: string
    timestamp: string
    expression: string
    confidence: number
    ftp_path: string
    updated_at: string
}
