<?php

namespace App\Http\Controllers;

use App\Models\Proker;
use App\Models\KAK;
use App\Models\Ormawa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProkerController extends Controller
{
    /**
     * Create a new KAKController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }
    
    // Method for handling HTTP GET requests
    public function index()
    {   
        $tahunSaatIni = date('Y');
        $tahunJabatan = $tahunSaatIni . '/' . ($tahunSaatIni + 1);

        // Filter prokers where ketua_ormawa.tahun_jabatan is equal to tahunJabatan
        $prokers = Proker::with('kak.ketua_ormawa.ormawa')
                    ->whereHas('kak.ketua_ormawa', function ($query) use ($tahunJabatan) {
                        $query->where('tahun_jabatan', $tahunJabatan);
                    })
                    ->get();

        if ($prokers->isEmpty()) {
            return response()->json(['message' => 'No Prokers found'], 404);
        }

        return response()->json($prokers, 200);
    }

    // Method for handling HTTP GET requests to show a single product
    public function show($id)
    {
        $prokers = Proker::with('kak.ketua_ormawa.ormawa')
                 ->where('id_proker', $id) // Menambahkan kondisi where
                 ->get();

        if (!$prokers) {
            return response()->json(['message' => 'Proker not found'], 404);
        }
        
        return response()->json($prokers, 200);
    }

    // Method for handling HTTP POST requests to create a new product
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_proker' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $proker = Proker::create($request->all());
        return response()->json($proker, 201);
    }

    // Method for handling HTTP PUT/PATCH requests to update a product
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'file_proposal' => 'file',
            'file_rab' => 'file',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $proker = Proker::find($id);
        if (!$proker) {
            return response()->json(['message' => 'Proker not found'], 404);
        }

        // Simpan file Proposal
        if ($request->hasFile('file_proposal')) {
            $fileProposal = $request->file('file_proposal');
            $fileNameProposal  = $id . '_' . $fileProposal->getClientOriginalName();
            $filePathProposal = public_path('uploads/proposal') . '/' . $fileNameProposal;
    
            // Hapus file lama jika sudah ada
            if (file_exists($filePathProposal)) {
                unlink($filePathProposal);
            }
    
            $fileProposal->move(public_path('uploads/proposal'), $fileNameProposal);

        }

        // Simpan file RAB
        if ($request->hasFile('file_rab')) {
            $fileRAB = $request->file('file_rab');
            $fileNameRAB  = $id . '_' . $fileRAB->getClientOriginalName();
            $filePathRAB = public_path('uploads/proposal') . '/' . $fileNameRAB;
    
            // Hapus file lama jika sudah ada
            if (file_exists($filePathRAB)) {
                unlink($filePathRAB);
            }
    
            $fileRAB->move(public_path('uploads/proposal'), $fileNameRAB);

        }
        $proker->update([
            'nama_kegiatan' => $request->input('nama_kegiatan'),
            'tanggal_mulai' => $request->input('tanggal_mulai'),
            'tanggal_akhir' => $request->input('tanggal_akhir'),
            'status' => $request->input('status'),
            'file_proposal' => $fileNameProposal ?? $proker->file_proposal,
            'file_rab' => $fileNameRAB ?? $proker->file_rab,
        ]);
        return response()->json($proker, 201);
    }

    // Method for handling HTTP DELETE requests to delete a product
    public function destroy($id)
    {
        $proker = Proker::find($id);

        if (!$proker) {
            return response()->json(['message' => 'Proker not found'], 404);
        }
        $proker->delete();
        return response()->json(['message' => 'Proker deleted successfully'], 200);
    }

    public function ubahIzinSubmit($id)
    {
        $proker = Proker::find($id);

        if ($proker) {
            // Convert the string value to a boolean and toggle it
            $proker->izin_submit = $proker->izin_submit === 'true' ? 'false' : 'true';

            $proker->save();

            return response()->json(['message' => 'Izin submit updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Proker not found'], 404);
        }
    }

    public function getFile($filename)
    {
        $path = public_path('uploads/proposal/'. $filename);

        if (!File::exists($path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        // $file = File::get($path);
        // $type = File::mimeType($path);

        // $response = response()->make($file, 200);
        // $response->header('Content-Type', $type);

        return response()->file($path, ['Content-Type' => 'application/pdf']);
    }

    /**
     * Get proker by KAK ID
     *
     * @param  int  $id_kak
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByKakId($id_kak)
    {
        $prokers = Proker::where('id_kak', $id_kak)->get();

        if ($prokers->isEmpty()) {
            return response()->json(['message' => 'No Prokers found for the given KAK ID'], 404);
        }

        return response()->json($prokers, 200);
    }

    /**
     * Get proker by KAK ID
     *
     * @param  int  $id_kak
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByTanggal($tanggal)
    {
        $prokers = Proker::where('tanggal_mulai', $tanggal)
        ->where('status', 'Acc Tahap 1')
        ->get();

        if ($prokers->isEmpty()) {
            return response()->json(['message' => 'No Prokers found'], 404);
        }

        return response()->json($prokers, 200);
    }

    /**
     * Get KAK Id
     *
     * @param  int  $id_kak
     * @return \Illuminate\Http\JsonResponse
     */
    public function getKAK($id)
    {
        $prokers = Proker::where('id_proker', $id)
        ->select('id_kak')
        ->get();

        if ($prokers->isEmpty()) {
            return response()->json(['message' => 'No Prokers found'], 404);
        }

        return response()->json($prokers, 200);
    }
}
