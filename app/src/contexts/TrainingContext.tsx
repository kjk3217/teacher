'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Training, TrainingFormData } from '@/types';
import { mockTrainings } from '@/lib/mock-data';

interface TrainingContextType {
  trainings: Training[];
  addTraining: (data: TrainingFormData) => Promise<Training>;
  updateTraining: (id: string, data: TrainingFormData) => Promise<Training>;
  deleteTraining: (id: string) => Promise<void>;
  getTraining: (id: string) => Training | undefined;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [trainings, setTrainings] = useState<Training[]>(mockTrainings);

  const addTraining = useCallback(async (data: TrainingFormData): Promise<Training> => {
    const newTraining: Training = {
      id: 'training-' + Date.now(),
      user_id: 'user-1',
      training_name: data.training_name,
      institution_name: data.institution_name,
      training_type: data.training_type,
      start_date: data.start_date,
      end_date: data.end_date,
      hours: data.hours,
      is_paid: data.is_paid,
      fee: data.fee,
      certificate_url: data.certificate_file ? URL.createObjectURL(data.certificate_file) : null,
      certificate_file_name: data.certificate_file?.name || null,
      status: '완료',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTrainings(prev => [newTraining, ...prev]);
    return newTraining;
  }, []);

  const updateTraining = useCallback(async (id: string, data: TrainingFormData): Promise<Training> => {
    let updated: Training | null = null;
    setTrainings(prev =>
      prev.map(t => {
        if (t.id === id) {
          updated = {
            ...t,
            ...data,
            certificate_url: data.certificate_file ? URL.createObjectURL(data.certificate_file) : t.certificate_url,
            updated_at: new Date().toISOString(),
          };
          return updated;
        }
        return t;
      })
    );
    return updated!;
  }, []);

  const deleteTraining = useCallback(async (id: string) => {
    setTrainings(prev => prev.filter(t => t.id !== id));
  }, []);

  const getTraining = useCallback((id: string) => {
    return trainings.find(t => t.id === id);
  }, [trainings]);

  return (
    <TrainingContext.Provider value={{ trainings, addTraining, updateTraining, deleteTraining, getTraining }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTrainings() {
  const context = useContext(TrainingContext);
  if (!context) throw new Error('useTrainings must be used within TrainingProvider');
  return context;
}
