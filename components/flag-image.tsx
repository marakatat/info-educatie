interface FlagImageProps {
  country: "uk" | "ro"
  width?: number
  height?: number
  className?: string
}

export function FlagImage({ country, width = 24, height = 24, className = "" }: FlagImageProps) {
  const ukFlagBase64 =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjAgMzAiIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCI+DQo8Y2xpcFBhdGggaWQ9InMiPg0KCTxwYXRoIGQ9Ik0wLDAgdjMwIGg2MCB2LTMwIHoiLz4NCjwvY2xpcFBhdGg+DQo8Y2xpcFBhdGggaWQ9InQiPg0KCTxwYXRoIGQ9Ik0zMCwxNSBoMzAgdjE1IHogdjE1IGgtMzAgeiBoLTMwIHYtMTUgeiB2LTE1IGgzMCB6Ii8+DQo8L2NsaXBQYXRoPg0KPGcgY2xpcC1wYXRoPSJ1cmwoI3MpIj4NCgk8cGF0aCBkPSJNMCwwIHYzMCBoNjAgdi0zMCB6IiBmaWxsPSIjMDEyMTY5Ii8+DQoJPHBhdGggZD0iTTAsMCBMNjAsMzAgTTYwLDAgTDAsMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2Ii8+DQoJPHBhdGggZD0iTTAsMCBMNjAsMzAgTTYwLDAgTDAsMzAiIGNsaXAtcGF0aD0idXJsKCN0KSIgc3Ryb2tlPSIjQzgxMDJFIiBzdHJva2Utd2lkdGg9IjQiLz4NCgk8cGF0aCBkPSJNMzAsMCB2MzAgTTAsMTUgaDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz4NCgk8cGF0aCBkPSJNMzAsMCB2MzAgTTAsMTUgaDYwIiBzdHJva2U9IiNDODEwMkUiIHN0cm9rZS13aWR0aD0iNiIvPg0KPC9nPg0KPC9zdmc+"

  const roFlagBase64 =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgMyAyIj4KPHJlY3Qgd2lkdGg9IjMiIGhlaWdodD0iMiIgeD0iMCIgeT0iMCIgZmlsbD0iIzAwMkI3RiIvPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB4PSIxIiB5PSIwIiBmaWxsPSIjRkNEMTE2Ii8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjIiIHg9IjIiIHk9IjAiIGZpbGw9IiNDRTExMjYiLz4KPC9zdmc+"

  const flagSrc = country === "uk" ? ukFlagBase64 : roFlagBase64

  return (
    <img
      src={flagSrc || "/placeholder.svg"}
      alt={country === "uk" ? "United Kingdom Flag" : "Romanian Flag"}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "cover" }}
    />
  )
}
