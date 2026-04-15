import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#1a1a1a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, color: '#f5c842' }}>☕</div>
      <div style={{ fontSize: 48, fontWeight: 700, color: '#fff', marginTop: 24 }}>
        Specialty Coffee Docs
      </div>
      <div style={{ fontSize: 24, color: '#aaa', marginTop: 16 }}>
        Brewing · Processing · Water Chemistry · Origins
      </div>
    </div>
  )
}
