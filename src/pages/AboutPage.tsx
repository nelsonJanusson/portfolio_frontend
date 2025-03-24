import React, { useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

// Define types for the form data
interface Link {
  name: string;
  url: string;
}

interface CreateProjectRequest {
  title: string;
  link: Link;
  description: string;
  tags: string[];
}

    const createProject = async (newProject: CreateProjectRequest): Promise<void> => {
      const response = await fetch('http://project-service-service:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
    
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
    
      // No response body, just return `void`
    };
export default function AboutPage() {
    // Form state
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // Mutation hook for creating the project
  const mutation: UseMutationResult<void, Error, CreateProjectRequest> = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      console.log('Project created successfully');
      // Optionally show a success message or redirect to another page
    },
    onError: (error) => {
      console.error('Error creating project:', error);
      // Optionally show an error message to the user
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the object to be sent in the POST request
    const newProject: CreateProjectRequest = {
      title,
      link: {name , url },
      description,
      tags,
    };

    // Call the mutation to create the project
    mutation.mutate(newProject);
  };
  

  return (
    <div>
      <h1>Create New Project</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Link URL:</label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="url">Link Text:</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            id="tags"
            type="text"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
          />
        </div>
        <button type="submit" >
          Create Project
        </button>
      </form>

      {mutation.isError && <p>Error: {mutation.error instanceof Error ? mutation.error.message : 'Something went wrong'}</p>}
      {mutation.isSuccess && <p>Project created successfully!</p>}
    </div>
  );
  }