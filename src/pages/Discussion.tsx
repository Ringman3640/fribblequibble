import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DiscussionHead from '../components/Discussion/DiscussionHead';
import QuibbleList from '../components/Discussion/QuibbleList';
import QuibbleEntryBox from '../components/Discussion/QuibbleEntryBox';

export default function Discussion() {
  const {id} = useParams();
  const [discussionInfo, setDiscussionInfo] = useState(undefined);
  const [loadedQuibbles, setLoadedQuibbles] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion/${id}`, { method: 'GET' })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setDiscussionInfo(json);
    });

    fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion/${id}/quibbles`, { method: 'GET' })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setLoadedQuibbles(json.quibbles);
    });
  }, []);

    return (
      <>
      <h1>Discussion Page</h1>
      <DiscussionHead discussionInfo={discussionInfo}/>
      <QuibbleEntryBox discussionId={id}/>
      <QuibbleList quibbles={loadedQuibbles}/>
      </>
    );
}