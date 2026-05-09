export const timeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const units = [
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (let i = 0; i < units.length; i++) {
    const val = Math.floor(seconds / units[i].seconds);
    if (val >= 1) {
      const remainder = seconds % units[i].seconds;
      const next = units[i + 1];
      if (next) {
        const nextVal = Math.floor(remainder / next.seconds);
        if (nextVal >= 1)
          return `${val} ${units[i].label} ${nextVal} ${next.label}`;
      }
      return `${val} ${units[i].label}`;
    }
  }

  return "just now";
};
