import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/navigation/PrimaryNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatisticsPanel from './components/StatisticsPanel';
import MemeCard from './components/MemeCard';
import FilterControls from './components/FilterControls';
import ActivityFeed from './components/ActivityFeed';
import AccountInfo from './components/AccountInfo';
import BulkActionsBar from './components/BulkActionsBar';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedMemes, setSelectedMemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const mockUser = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com"
  };

  const mockStats = {
    totalMemes: 47,
    totalDownloads: 132,
    storageUsed: 3.2,
    storageLimit: 10,
    activeProjects: 5
  };

  const mockPlan = {
    type: "free",
    memesUsed: 3,
    memesLimit: 5
  };

  const mockMemes = [
  {
    id: 1,
    title: "Epic Gaming Moment Compilation",
    thumbnail: "https://images.unsplash.com/photo-1726442058613-1a216f06cedd",
    thumbnailAlt: "Young gamer with headphones playing video games on computer in dark room with colorful RGB lighting",
    status: "completed",
    createdAt: new Date(2026, 0, 25),
    source: "youtube.com/watch?v=abc123",
    duration: "2:34",
    modifications: ["Cropped", "Speed 1.5x", "Text Added"]
  },
  {
    id: 2,
    title: "Funny Cat Reactions Meme",
    thumbnail: "https://images.unsplash.com/photo-1675637038744-4f778ab5b4af",
    thumbnailAlt: "Adorable gray tabby cat with bright green eyes sitting on wooden floor looking directly at camera",
    status: "completed",
    createdAt: new Date(2026, 0, 24),
    source: "youtube.com/watch?v=def456",
    duration: "1:15",
    modifications: ["Color Filter", "Text Added"]
  },
  {
    id: 3,
    title: "Sports Highlight Reel",
    thumbnail: "https://images.unsplash.com/photo-1422482002058-d8b7f1e5a6e2",
    thumbnailAlt: "Professional basketball player in white jersey jumping high to dunk ball in packed indoor arena",
    status: "processing",
    createdAt: new Date(2026, 0, 27),
    source: "youtube.com/watch?v=ghi789",
    duration: "3:45",
    modifications: ["Cropped", "Speed 2x"]
  },
  {
    id: 4,
    title: "Dance Challenge Compilation",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_16d639019-1767025698359.png",
    thumbnailAlt: "Group of young diverse dancers performing synchronized hip hop moves in modern dance studio with mirrors",
    status: "completed",
    createdAt: new Date(2026, 0, 23),
    source: "youtube.com/watch?v=jkl012",
    duration: "2:10",
    modifications: ["Text Added", "Color Filter"]
  },
  {
    id: 5,
    title: "Cooking Tutorial Highlights",
    thumbnail: "https://images.unsplash.com/photo-1591553471966-f0b8bb913071",
    thumbnailAlt: "Stack of golden brown fluffy pancakes topped with fresh strawberries and blueberries on white plate",
    status: "failed",
    createdAt: new Date(2026, 0, 22),
    source: "youtube.com/watch?v=mno345",
    duration: "4:20",
    modifications: ["Cropped"]
  },
  {
    id: 6,
    title: "Travel Vlog Best Moments",
    thumbnail: "https://images.unsplash.com/photo-1594725224909-0e66d59ed0f1",
    thumbnailAlt: "Scenic mountain landscape with snow-capped peaks reflected in crystal clear alpine lake during golden hour",
    status: "completed",
    createdAt: new Date(2026, 0, 21),
    source: "youtube.com/watch?v=pqr678",
    duration: "5:30",
    modifications: ["Cropped", "Speed 1.2x", "Text Added", "Color Filter"]
  },
  {
    id: 7,
    title: "Music Video Remix",
    thumbnail: "https://images.unsplash.com/photo-1723210734602-461b131456c0",
    thumbnailAlt: "Professional DJ with headphones mixing music on turntables with colorful neon lights in nightclub",
    status: "completed",
    createdAt: new Date(2026, 0, 20),
    source: "youtube.com/watch?v=stu901",
    duration: "3:15",
    modifications: ["Speed 0.8x", "Color Filter"]
  },
  {
    id: 8,
    title: "Tech Review Highlights",
    thumbnail: "https://images.unsplash.com/photo-1652305313386-726913544262",
    thumbnailAlt: "Modern smartphone with sleek black design displaying colorful app icons on bright OLED screen",
    status: "processing",
    createdAt: new Date(2026, 0, 27),
    source: "youtube.com/watch?v=vwx234",
    duration: "2:50",
    modifications: ["Cropped", "Text Added"]
  }];


  const mockActivities = [
  {
    id: 1,
    type: "completed",
    message: "Epic Gaming Moment Compilation processing completed successfully",
    timestamp: new Date(2026, 0, 27, 14, 30)
  },
  {
    id: 2,
    type: "downloaded",
    message: "Downloaded Funny Cat Reactions Meme in 1080p quality",
    timestamp: new Date(2026, 0, 27, 13, 15)
  },
  {
    id: 3,
    type: "created",
    message: "Started processing Sports Highlight Reel",
    timestamp: new Date(2026, 0, 27, 12, 45)
  },
  {
    id: 4,
    type: "edited",
    message: "Updated modifications for Dance Challenge Compilation",
    timestamp: new Date(2026, 0, 27, 11, 20)
  },
  {
    id: 5,
    type: "failed",
    message: "Cooking Tutorial Highlights processing failed - invalid video format",
    timestamp: new Date(2026, 0, 27, 10, 10)
  }];


  const filteredAndSortedMemes = useMemo(() => {
    let filtered = mockMemes;

    if (searchQuery) {
      filtered = filtered?.filter((meme) =>
      meme?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      meme?.source?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered?.filter((meme) => meme?.status === filterStatus);
    }

    const sorted = [...filtered]?.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return b?.createdAt - a?.createdAt;
        case "date-asc":
          return a?.createdAt - b?.createdAt;
        case "title-asc":
          return a?.title?.localeCompare(b?.title);
        case "title-desc":
          return b?.title?.localeCompare(a?.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, filterStatus, sortBy]);

  const handleMemeSelect = (memeId) => {
    setSelectedMemes((prev) =>
    prev?.includes(memeId) ?
    prev?.filter((id) => id !== memeId) :
    [...prev, memeId]
    );
  };

  const handleBulkDownload = () => {
    console.log("Downloading memes:", selectedMemes);
    alert(`Downloading ${selectedMemes?.length} meme(s)...`);
    setSelectedMemes([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedMemes?.length} meme(s)?`)) {
      console.log("Deleting memes:", selectedMemes);
      alert(`Deleted ${selectedMemes?.length} meme(s)`);
      setSelectedMemes([]);
    }
  };

  const handleRedownload = (memeId) => {
    console.log("Redownloading meme:", memeId);
    alert("Downloading meme...");
  };

  const handleEdit = (memeId) => {
    navigate('/video-editor', { state: { memeId } });
  };

  const handleDelete = (memeId) => {
    if (window.confirm("Are you sure you want to delete this meme?")) {
      console.log("Deleting meme:", memeId);
      alert("Meme deleted successfully");
    }
  };

  const handleUpgrade = () => {
    alert("Redirecting to upgrade page...");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      navigate('/landing-page');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation user={mockUser} onLogout={handleLogout} />
      <main className="pt-20 pb-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-6 md:mb-8 lg:mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 md:mb-3">
              Welcome back, {mockUser?.name?.split(' ')?.[0]}!
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Manage your meme creations and track your activity
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <StatisticsPanel stats={mockStats} />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-6 md:mb-8">
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/video-input')}
              className="w-full lg:w-auto">

              Create New Meme
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Download"
              iconPosition="left"
              onClick={() => alert("Select memes to enable bulk download")}
              disabled={selectedMemes?.length === 0}
              className="w-full lg:w-auto">

              Bulk Download ({selectedMemes?.length})
            </Button>
          </div>

          <div className="mb-6 md:mb-8">
            <FilterControls
              onFilterChange={setFilterStatus}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
                    Your Memes
                  </h2>
                  <span className="text-sm md:text-base text-muted-foreground">
                    {filteredAndSortedMemes?.length} {filteredAndSortedMemes?.length === 1 ? 'meme' : 'memes'}
                  </span>
                </div>

                {filteredAndSortedMemes?.length === 0 ?
                <div className="text-center py-12 md:py-16 lg:py-20">
                    <Icon name="Inbox" size={64} className="text-muted-foreground mx-auto mb-4 md:mb-6" />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                      No memes found
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                      {searchQuery || filterStatus !== "all" ? "Try adjusting your filters or search query" : "Start creating your first meme!"}
                    </p>
                    <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => navigate('/video-input')}>

                      Create New Meme
                    </Button>
                  </div> :

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {filteredAndSortedMemes?.map((meme) =>
                  <MemeCard
                    key={meme?.id}
                    meme={meme}
                    isSelected={selectedMemes?.includes(meme?.id)}
                    onSelect={handleMemeSelect}
                    onRedownload={handleRedownload}
                    onEdit={handleEdit}
                    onDelete={handleDelete} />

                  )}
                  </div>
                }
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <AccountInfo plan={mockPlan} onUpgrade={handleUpgrade} />
              <ActivityFeed activities={mockActivities} />
            </div>
          </div>
        </div>
      </main>
      <BulkActionsBar
        selectedCount={selectedMemes?.length}
        onBulkDownload={handleBulkDownload}
        onBulkDelete={handleBulkDelete}
        onClearSelection={() => setSelectedMemes([])} />

    </div>);

};

export default UserDashboard;