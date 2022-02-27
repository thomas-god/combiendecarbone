import { GESCategory, Ecogeste } from '@/ui/store/modules/ges';

export interface ConsommationItem {
  name: string
  full_name: string
  value: number
}

/**
 * Check if an object is compatible with the ConsommationItem
 * interface.
 * @param item Item to check.
 */
export function checkConsoItem(item: ConsommationItem): boolean {
  if (item.name === undefined) return false;
  if (typeof item.name !== 'string') return false;

  if (item.full_name === undefined) return false;
  if (typeof item.full_name !== 'string') return false;

  if (item.value === undefined) return false;
  if (typeof item.value !== 'number') return false;
  return true;
}

export enum Categories {
  'Vêtements',
  'High-tech',
  'Électroménager'
}

export interface Store {
  consommation: Record<string, ConsommationItem[]>
  ges: GESCategory
}

/**
 * Check if an object is compatible with the Consommation
 * store object.
 * @param form Form object to check.
 */
export function checkConsommationForm(form: Store['consommation']): boolean {
  return Object.keys(form)
    .map((cat) => form[cat]
      .map((item) => checkConsoItem(item))
      .every((b) => b))
    .every((b) => b);
}

const vetements_ges: ConsommationItem[] = [
  { name: 'jeans', full_name: 'Jeans', value: 25 },
  { name: 'tee-shirt', full_name: 'Tee-shirt', value: 7 },
  { name: 'chemise', full_name: 'Chemise', value: 13 },
  { name: 'pull-acrylique', full_name: 'Pull acrylique', value: 28 },
  { name: 'pull-laine', full_name: 'Pull laine', value: 56 },
  { name: 'sweat-coton', full_name: 'Sweat coton', value: 31 },
  { name: 'robe', full_name: 'Robe', value: 56 },
  { name: 'manteau', full_name: 'Manteau', value: 89 },
  { name: 'chaussure', full_name: 'Chaussures', value: 19 },
];
export const vetements_options = vetements_ges.map(
  (item: ConsommationItem): ConsommationItem => ({ name: item.name, full_name: item.full_name, value: 0 }),
);
const high_tech_ges: ConsommationItem[] = [
  { name: 'smartphone', full_name: 'Smartphone', value: 30 },
  { name: 'portable', full_name: 'Ordinateur portable', value: 156 },
  { name: 'fixe', full_name: 'Ordinateur fixe', value: 200 },
  { name: 'tele', full_name: 'Télévision', value: 350 },
];
export const high_tech_options = high_tech_ges.map((item) => ({ name: item.name, full_name: item.full_name, value: 0 }));
const electromenager_ges: ConsommationItem[] = [
  { name: 'four', full_name: 'Four', value: 217 },
  { name: 'lave-vaisselle', full_name: 'Lave-vaisselle', value: 253 },
  { name: 'lave-linge', full_name: 'Lave-linge', value: 320 },
  { name: 'frigo', full_name: 'Réfrigérateur', value: 257 },
];
export const electromenager_options = electromenager_ges.map((item) => ({ name: item.name, full_name: item.full_name, value: 0 }));

function getItemGesValue(arr: ConsommationItem[], item_name: string): number {
  const res = arr.find((item) => item.name === item_name);
  return res ? res.value : 0;
}
function mul(a: number, b: number): number {
  return a * b;
}
function div(a: number, b: number): number {
  return b === 0 ? 0 : a / b;
}

function computeGesByCategory(
  category: keyof typeof Categories,
  consommation: ConsommationItem[],
  ges_values: ConsommationItem[],
): number {
  let ges = 0;
  const op = category === 'Vêtements' ? mul : div;
  consommation.forEach((item) => {
    ges += op(getItemGesValue(ges_values, item.name), item.value);
  });
  return ges;
}

function computeGes(
  consommation: Record<string, ConsommationItem[]>,
): GESCategory {
  const ges: GESCategory = { total: 0, items: [] };
  ges.items = [
    {
      category: 'Consommation',
      label: 'Vêtements',
      value: computeGesByCategory(
        'Vêtements',
        consommation['Vêtements'],
        vetements_ges,
      ),
      ecogeste: chooseEcogeste(),
    },
    {
      category: 'Consommation',
      label: 'High-tech',
      value: computeGesByCategory(
        'High-tech',
        consommation['High-tech'],
        high_tech_ges,
      ),
      ecogeste: chooseEcogeste(),
    },
    {
      category: 'Consommation',
      label: 'Électroménager',
      value: computeGesByCategory(
        'Électroménager',
        consommation['Électroménager'],
        electromenager_ges,
      ),
      ecogeste: chooseEcogeste(),
    },
  ];

  ges.total = ges.items.reduce((s, c) => s + c.value, 0);

  return ges;
}

function chooseEcogeste(): Ecogeste {
  return { name: 'EcogesteConsommation' };
}

const consommation: Record<string, ConsommationItem[]> = {
  vetements: vetements_ges.map(
    (item: ConsommationItem): ConsommationItem => ({ name: item.name, full_name: item.full_name, value: 0 }),
  ),
  high_tech: high_tech_ges.map((item) => ({ name: item.name, full_name: item.full_name, value: 0 })),
  electromenager: electromenager_ges.map((item) => ({ name: item.name, full_name: item.full_name, value: 0 })),
};

export { consommation, computeGes };
