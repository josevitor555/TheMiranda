import WaveSurfer from 'wavesurfer.js';
import { Download, Pause, Play, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

const WaveformPlayer = ({ audioUrl, onClose }) => {
  const nodeRef = useRef(null);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  // const [showPlayer, setShowPlayer] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");

  if (!audioUrl) return null;

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#fafafa',
      progressColor: '#F1EFEC',
      height: 72,
      barWidth: 2,
      barRadius: 2,
      responsive: true,
    });

    wavesurfer.current = ws;

    fetch(audioUrl)
      .then(res => res.blob())
      .then(blob => {
        wavesurfer.current.loadBlob(blob);
      });

    ws.on('ready', () => {
      const dur = ws.getDuration();
      const mins = Math.floor(dur / 60);
      const secs = Math.floor(dur % 60).toString().padStart(2, '0');
      setDuration(`${mins}:${secs}`);
    });

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  const togglePlayback = () => {
    if (!wavesurfer.current) return;
    wavesurfer.current.playPause();
    setIsPlaying(wavesurfer.current.isPlaying());
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div
        ref={nodeRef}
        style={{ position: 'absolute', top: '100px', left: '100px', cursor: 'move', zIndex: 1000 }}
        className="wave-surfer animate-slide-down p-3 rounded-xl flex items-center gap-3 w-full max-w-md"
      >
        {/* Header */}
        <div className="min-header flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {audioUrl && (
              <a
                href={audioUrl}
                download="audio.wav"
                className="download-circle bg-[#40434b] p-2 text-[#FFF2D7] flex items-center justify-center w-10 h-10"
              >
                <Download />
              </a>
            )}
          </div>

          <span className="text-2xl text-white"> Miranda Voice </span>
          <span
            onClick={onClose}
            className="close-wave bg-[#40434b] p-2 text-[#FFF2D7] flex items-center justify-center w-10 h-10 cursor-pointer"
          >
            <X />
          </span>
        </div>

        {/* Waveform */}
        <div className="modal-wavesurfer w-full">
          <div className="circle__waveform"></div>
          <div className="wave-form h-12 flex items-center overflow-hidden">
            <div ref={waveformRef} className="h-full w-full" />
          </div>
        </div>

        {/* Controls */}
        <div className="play-pause__button flex items-center gap-2">
          <button onClick={togglePlayback} className="bg-[#40434b] p-3 rounded-full">
            {isPlaying ? (
              <Pause className="w-5 h-5 text-[#FFF2D7]" />
            ) : (
              <Play className="w-5 h-5 text-[#FFF2D7]" />
            )}
          </button>
          <span className="text-[#FFF2D7] min-w-[40px] text-right">{duration}</span>
        </div>
      </div>
    </Draggable>
  );
};

export default WaveformPlayer;
