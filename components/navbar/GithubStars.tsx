"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Button } from "@/components/ui/button";

const repoLink = "https://github.com/Huzaifa-Yaqoob/ui-bloom";
const apiUrl = "https://api.github.com/repos/Huzaifa-Yaqoob/ui-bloom";

function GithubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Failed to fetch stars", err));
  }, []);

  return (
    <Button
      variant="ghost"
      nativeButton={false}
      render={<Link href={repoLink} target="_blank" rel="noopener noreferrer" />}
      className="gap-2"
    >
      <SiGithub size={18} />
      {stars !== null && <span>{stars}</span>}
    </Button>
  );
}

export default GithubStars;
