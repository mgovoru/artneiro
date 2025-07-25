'use client';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next-image-export-optimizer';
import { useMediaQuery, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

type Item = {
  img: string;
  title: string;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline: 'none',
};

const itemData = [
  {
    img: '/assets/narrow_street.jpg',
    title: 'narrow street',
  },
  {
    img: '/assets/giraf.jpg',
    title: 'giraf',
  },
  {
    img: '/assets/fly.jpg',
    title: 'fly',
  },
  {
    img: '/assets/older_couple.jpg',
    title: 'older couple',
  },
  {
    img: '/assets/trip.jpg',
    title: 'trip',
  },
  {
    img: '/assets/plain.jpg',
    title: 'plain',
  },
  {
    img: '/assets/forest.jpg',
    title: 'forest',
  },
  {
    img: '/assets/flower.jpg',
    title: 'flower',
  },
  {
    img: '/assets/shot.png',
    title: 'shot',
  },
  {
    img: '/assets/metropolis.jpg',
    title: 'metropolis',
  },
  {
    img: '/assets/street_art_1.jpg',
    title: 'street_art_1',
  },
  {
    img: '/assets/street_art_2.jpg',
    title: 'street_art_2',
  },
  {
    img: '/assets/woman.jpg',
    title: 'woman',
  },
  {
    img: '/assets/black_sea.jpg',
    title: 'black_sea',
  },
  {
    img: '/assets/landscape.jpg',
    title: 'landscape',
  },
  {
    img: '/assets/forest_art.jpg',
    title: 'forest_art',
  },
  {
    img: '/assets/cloud.jpg',
    title: 'cloud',
  },
  {
    img: '/assets/cup.jpg',
    title: 'cup',
  },
  {
    img: '/assets/woman_M.jpg',
    title: 'woman',
  },
];

const MBox = motion(Box);
const MImage = motion(Image);
const MImageListItem = motion(ImageListItem);

export default function GalleryWithModal() {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<Item | null>(null);

  const handleOpen = (img: Item) => {
    setSelectedImg(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImg(null);
  };

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  let cols = 3;
  if (matchesSm) cols = 1;
  else if (matchesMd) cols = 2;

  return (
    <>
      <MBox sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <ImageList
          variant='masonry'
          cols={cols}
          gap={8}
          sx={{ overflow: 'hidden' }}
        >
          {itemData.map((item, index) => (
            <MImageListItem
              key={item.img}
              onClick={() => handleOpen(item)}
              initial={{
                y: 60,
                scale: 0.95,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: index * 0.13,
                type: 'spring',
                stiffness: 80,
                damping: 16,
              }}
              viewport={{ amount: 0.7, once: true }}
            >
              <Image
                src={item.img}
                alt={item.title}
                width={600}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                priority={false}
              />
            </MImageListItem>
          ))}
        </ImageList>
      </MBox>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <AnimatePresence>
          <Fade in={open}>
            <MBox sx={style}>
              {selectedImg && (
                <>
                  <MImage
                    src={selectedImg.img}
                    alt={selectedImg.title}
                    width={450}
                    height={300}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3 }}
                  />
                  <Typography variant='h6' sx={{ mt: 2 }}>
                    {selectedImg.title}
                  </Typography>
                </>
              )}
            </MBox>
          </Fade>
        </AnimatePresence>
      </Modal>
    </>
  );
}
