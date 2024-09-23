import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography, Link, Tooltip } from "@mui/material";

const DeveloperTimeline = ({ username }) => {
  const [developerInfo, setDeveloperInfo] = useState(null);

  useEffect(() => {
    const fetchDeveloperData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setDeveloperInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDeveloperData();
  }, [username]);

  if (!developerInfo) return null;

  return (
    <Tooltip title={developerInfo.bio || "No bio available"} arrow>
      <Box sx={{ textAlign: "center", margin: 2 }}>
        <Avatar
          alt={developerInfo.login}
          src={developerInfo.avatar_url}
          sx={{
            width: { xs: 120, sm: 150, md: 180 },
            height: { xs: 120, sm: 150, md: 180 },
            margin: "0 auto",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
        <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold" }}>
          {developerInfo.login}
        </Typography>
        <Link href={developerInfo.html_url} target="_blank" rel="noopener">
          Ver perfil en GitHub
        </Link>
      </Box>
    </Tooltip>
  );
};

const DevelopersTimeline = () => {
  const developers = ["FabSDevX", "OlmanCE", "FabricioAA223", "CharlieCharlieX"];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 3,
        overflowX: "auto",
        flexWrap: "wrap", 
        gap: 2,
      }}
    >
      {developers.map((dev) => (
        <DeveloperTimeline key={dev} username={dev} />
      ))}
    </Box>
  );
};

export default DevelopersTimeline;
