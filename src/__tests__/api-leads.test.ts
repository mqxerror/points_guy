import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase
const mockInsert = vi.fn();
const mockSelect = vi.fn();
const mockSingle = vi.fn();
const mockFrom = vi.fn(() => ({
  insert: mockInsert.mockReturnValue({
    select: mockSelect.mockReturnValue({
      single: mockSingle,
    }),
  }),
}));

vi.mock('@/lib/supabase/server', () => ({
  getSupabaseAdmin: () => ({
    from: mockFrom,
  }),
}));

// Dynamically import POST after mocks are set up
const { POST } = await import('@/app/api/leads/route');

describe('POST /api/leads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSingle.mockResolvedValue({ data: { id: 'test-id' }, error: null });
  });

  it('returns 400 for invalid data', async () => {
    const request = new Request('http://localhost/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bad' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
  });

  it('returns 201 for valid data', async () => {
    const request = new Request('http://localhost/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'John Doe',
        email: 'john@example.com',
        program: 'portugal',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.id).toBe('test-id');
  });

  it('silently accepts honeypot submissions', async () => {
    const request = new Request('http://localhost/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Bot User',
        email: 'bot@spam.com',
        program: 'portugal',
        website: 'http://spam.com',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    // Should NOT have called Supabase
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it('returns 500 on Supabase error', async () => {
    mockSingle.mockResolvedValueOnce({ data: null, error: { message: 'DB error' } });

    const request = new Request('http://localhost/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'John Doe',
        email: 'john@example.com',
        program: 'greece',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });
});
