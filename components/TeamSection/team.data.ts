export interface TeamMember {
  id: string;
  photo: string;
  /** Ism to'g'ridan-to'g'ri yoziladi (tarjima talab qilmaydi) */
  name: string;
  /** Tavsif tarjima kaliti */
  bioKey: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    photo: "/images/team-1.jpg",
    name: "Janna",
    bioKey: "team.bio1",
  },
  {
    id: "member-2",
    photo: "/images/team-2.jpg",
    name: "Nilufar",
    bioKey: "team.bio2",
  },
  {
    id: "member-3",
    photo: "/images/team-3.jpg",
    name: "Dilnoza",
    bioKey: "team.bio3",
  },
];