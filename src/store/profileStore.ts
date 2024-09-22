import create from 'zustand';

interface IProfile {
    name: string;
    age: number;
}

export const useProfileStore = create<IProfile>((set) => ({
    name: 'John Doe',
    age: 30,
    setName: (name: string) => set({ name }),
    setAge: (age: number) => set({ age }),
    reset: () => set({ name: 'John Doe', age: 30 }),
}));