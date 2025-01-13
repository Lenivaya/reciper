export interface TagColors {
  base: string
  hover: string
  text: string
}

export function getTagColor(tag: string): TagColors {
  // Generate a consistent hue based on the tag name
  const hue =
    tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360

  // Use golden ratio for better color distribution
  const saturation = 85
  const lightness = 92
  const hoverLightness = 88

  return {
    base: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    hover: `hsl(${hue}, ${saturation}%, ${hoverLightness}%)`,
    text: `hsl(${hue}, ${saturation}%, 20%)`
  }
}

const TAG_COLORS = [
  'bg-violet-500/10 text-violet-500 hover:bg-violet-500/20',
  'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20',
  'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20',
  'bg-teal-500/10 text-teal-500 hover:bg-teal-500/20',
  'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
  'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  'bg-lime-500/10 text-lime-500 hover:bg-lime-500/20',
  'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
  'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
  'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20',
  'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20',
  'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
  'bg-fuchsia-500/10 text-fuchsia-500 hover:bg-fuchsia-500/20'
]

export const getTagColorV2 = (tagIndex: number): string =>
  TAG_COLORS[tagIndex % TAG_COLORS.length]
