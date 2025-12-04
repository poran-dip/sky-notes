export const truncateString = (str: string, maxLength: number = 20) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...'; 
  } else {
    return str;
  }
}

export const timeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const units = [
    { label: 'y', seconds: 31536000 },
    { label: 'm', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'min', seconds: 60 },
    { label: 's', seconds: 1 },
  ];

  for (const u of units) {
    const val = Math.floor(seconds / u.seconds);
    if (val >= 1) return `${val} ${u.label} ago`;
  }

  return 'just now';
};
