export type Walker = {
  id: string;
  name: string;
  isVerified: boolean;
  ratePerHour: number; // £/hr
  rating: number; // 0-5
  photoUrl?: string;
  bio?: string;
};

const walkers: Walker[] = [
  {
    id: "w1",
    name: "Sam P.",
    isVerified: true,
    ratePerHour: 18,
    rating: 4.9,
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Lifelong dog lover. Punctual, caring, and energetic."
  },
  {
    id: "w2",
    name: "Alex R.",
    isVerified: true,
    ratePerHour: 16,
    rating: 4.7,
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Former vet assistant. Great with anxious pups."
  },
  {
    id: "w3",
    name: "Jamie K.",
    isVerified: false,
    ratePerHour: 14,
    rating: 4.5,
    photoUrl: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "New to PetWalk, references available on request."
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function listWalkers(): Promise<Walker[]> {
  await delay(300);
  return walkers;
}

export async function getWalker(id: string): Promise<Walker | undefined> {
  await delay(200);
  return walkers.find((w) => w.id === id);
}

// Optionally, add a booking function if needed by your app:
export async function bookWalker(id: string): Promise<boolean> {
  await delay(200);
  // Simulate booking logic here
  return true;
}
