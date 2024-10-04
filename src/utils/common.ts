export function timeDiff(givenDate: string | Date): string {
  const date = (typeof givenDate === 'string') ? new Date(givenDate) : givenDate;
  
  if(date===undefined){
    return 'Invalid Date'
  }
  if (isNaN(date.getTime())) {
    // Handle invalid date input
    return "Invalid date";
  }

  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds === 1) {
    return `${seconds} second ago`;
  } else if (seconds > 1 && seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes === 1) {
    return `${minutes} minute ago`;
  } else if (minutes > 1 && minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours === 1) {
    return `${hours} hour ago`;
  } else if (hours > 1 && hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return `${days} day ago`;
  } else if (days > 1 && days < 30) {
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString();
  }
}
