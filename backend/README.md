 Backend API for the pantry project
 Uses uv for environment management

common commands:
 uv add <package> (updates pyproject.toml and uv lock)
 uv remove <package> (updates pyproject.toml and uv lock)
 uv sync  (installs dependencies from the lock file)
 uv lock --upgrade (updates depenencies)
 uv pip show <packag> (get package specific info)
 uv pip list (get package info)
 uv run python <file> (automatically uses venv with no need to activate)
