import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DiscussionHead } from '../features/discussions';
import { QuibbleList, QuibbleEntryBox } from '../features/quibbles';
import useFetchBackend from '../hooks/useFetchBackend';
import { FetchMethod } from '../types/BackendFetchInfo';

export default function Discussion() {
  const {id} = useParams();
  const [discussionInfo, discussionError, discussionLoading] = useFetchBackend({
    route: `/discussion/${id}`,
    method: FetchMethod.Get
  });
  const [quibbleList, quibblesError, quibblesLoading] = useFetchBackend({
    route: `/discussion/${id}/quibbles`,
    method: FetchMethod.Get,
    sendCookies: true
  });

  if (discussionLoading) {
    return (
      <h1>Discussion Loading</h1>
    );
  }

  if (discussionError) {
    return (
      <h1>Could Not Access Discussion</h1>
    );
  }

  return (
    <>
    <h1>Discussion Page</h1>
    <DiscussionHead discussionInfo={discussionInfo}/>
    <QuibbleEntryBox discussionId={id}/>
    {quibbleList && <QuibbleList quibbles={quibbleList.quibbles}/>}
    </>
  );
}