import { create } from 'zustand';
import { PaisEntity } from '../../core/entities/pais_entity';
import { injector } from '../../infrastructure/di/injector';
import { Failure } from "../../shared/errors/failures";
import { Result } from "../../shared/utils/result";

interface PaisState {
    paises: PaisEntity[];
    loading: boolean;
    error: string | null;
}

interface PaisActions {
    loadAllPaises: () => Promise<void>;
    loadPaisById: (id: string) => Promise<void>;
    reset: () => void;
}

const initialState: PaisState = {
    paises: [],
    loading: false,
    error: null,
};

export const usePaisStore = create<PaisState & PaisActions>((set) => ({
    ...initialState,

    loadAllPaises: async () => {
        set({ loading: true, error: null });

        try {
            const result = await injector.paisController.loadAllPaises();

            result.fold(
                (failure) => {
                    set({ loading: false, error: failure.message });
                },
                (countries) => {
                    set({ paises: countries, loading: false, error: null });
                }
            );
        } catch (error) {
            set({ 
                loading: false, 
                error: 'Erro inesperado ao carregar países' 
            });
        }
    },

    loadPaisById: async (id: string) => {
        set({ loading: true, error: null });

        try {
            const result = await injector.paisController.loadPaisById(id);

            result.fold(
                (failure) => {
                    set({ loading: false, error: failure.message });
                },
                (country) => {
                    // Atualiza ou adiciona o país na lista
                    set((state) => ({
                        paises: [...state.paises.filter(p => p.iso2 !== country.iso2), country],
                        loading: false,
                        error: null
                    }));
                }
            );
        } catch (error) {
            set({ 
                loading: false, 
                error: 'Erro inesperado ao carregar país' 
            });
        }
    },

    reset: () => set(initialState),
}));